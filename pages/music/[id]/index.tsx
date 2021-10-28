import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useMutation} from "react-query"

import {InputPropertyValueMap, PagesRetrieveResponse} from "@notionhq/client/build/src/api-endpoints"
import {Box, Button, Divider, Flex, Heading, Link, Paragraph, Ratio, Text, Textarea} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import {GetServerSideProps} from "next"
import Head from "next/head"
import Image from "next/image"
import {refineAlbumData} from "pages/music"
import {ColorKey,Sx} from "theme"
import {useAuthorization} from "utils/authorization"
import {MusicAlbumData, MusicAlbumPropertyValueMap, MusicAlbumReviewLanguage, MusicPage, notion, returnReviewDict, updateNotionMusicAlbumPage} from "utils/query"


export type MusicAlbumProps = {
  page: MusicPage | null;
}

export default function MusicAlbum({
  page,
}:MusicAlbumProps) {
  const {hasPermission} = useAuthorization()

  const [reviewLanguage, setReviewLanguage] = useState<MusicAlbumReviewLanguage>()
  const [isEditingReview, setIsEditingReview] = useState(false)
  const [editingReview, setEditingReview] = useState("");

  const albumData: MusicAlbumData | null = useMemo(
    ()=> page ?  refineAlbumData(page) : null, 
    [page] 
  );

  const {title, artistList, key, src, rating, performer, released, reviewEng, reviewKor, reviewJpn, rym} = useMemo(
    ()=> albumData ? (albumData.essence || {}) : {},[albumData]
  )

  const updateMutation = useMutation((newMusicAlbumProperties: InputPropertyValueMap) => updateNotionMusicAlbumPage(page?.id || "", newMusicAlbumProperties), {
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log("success!", data)
  })

  const dateText = useMemo(()=>{
    if (!released) return "";
    const releasedDate = new Date(released);
    const year = releasedDate.getFullYear();
    const month = releasedDate.getMonth();
    const dayOfMonth = releasedDate.getDate();
    return `${year}.${month}.${dayOfMonth}`
  },[released])
  

  const badgeSx: Sx  = useMemo(()=>{
    return ({
      borderRadius: "4px",
      paddingX: 3,
      paddingY: 1,
      backgroundColor: ColorKey["bg.weak"],
      margin: 2,
    })
  },[])

  const availableReviewLanguageList = useMemo(()=>{
    const allReviewLanguageList = Object.values(MusicAlbumReviewLanguage) as MusicAlbumReviewLanguage[];
    
    if (!albumData) return []
    return allReviewLanguageList.filter(item => returnReviewDict(albumData)[item])
  },[albumData])

  const isThisLanguageSelected = useCallback((language: MusicAlbumReviewLanguage)=> (reviewLanguage && language === reviewLanguage), [reviewLanguage])

  // TODO: make showingReview as state, and use useEffect here
  const showingReview = useMemo(()=>{
    if (reviewLanguage === MusicAlbumReviewLanguage.KOR && reviewKor) return reviewKor
    else if (reviewLanguage === MusicAlbumReviewLanguage.ENG && reviewEng) return reviewEng
    else if (reviewLanguage === MusicAlbumReviewLanguage.JPN && reviewJpn) return reviewJpn
    
    else if (reviewKor){
      setReviewLanguage(MusicAlbumReviewLanguage.KOR)
      return reviewKor
    }
    else if (reviewEng){
      setReviewLanguage(MusicAlbumReviewLanguage.ENG)
      return reviewEng
    }
    else if (reviewJpn){
      setReviewLanguage(MusicAlbumReviewLanguage.JPN)
      return reviewJpn
    }

    else {
      setReviewLanguage(undefined)
      return null;
    }
  },[reviewEng, reviewJpn, reviewKor, reviewLanguage])

  const onClickEdit = useCallback(()=>{
    if (showingReview){
      setEditingReview(showingReview)
    }
    setIsEditingReview(true);
  },[showingReview])

  const onClickSave = useCallback(()=>{
    setIsEditingReview(false);

    const propertyName = (
      reviewLanguage === MusicAlbumReviewLanguage.ENG ? "Review ENG"
        : reviewLanguage === MusicAlbumReviewLanguage.KOR ? "Review KOR"
          : reviewLanguage === MusicAlbumReviewLanguage.JPN ? "Review JPN"
            : "Review ENG"
    );

    updateMutation.mutate(
      {
        [propertyName]: {
          type: "rich_text",
          "rich_text": [
            {
              type: "text",
              "text": {
                content: editingReview,
              }
            }
          ]
        }
      }
    )

  },[editingReview, reviewLanguage, updateMutation])

  const onClickCancel = useCallback(()=>{
    setIsEditingReview(false);
  },[])

  const onClickReviewLanguageButton = useCallback((newLanguage: MusicAlbumReviewLanguage)=>{
    if (!isEditingReview){
      setReviewLanguage(newLanguage)
    }
  },[isEditingReview])

  const onChangeReview: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((event)=>{
    setEditingReview(event.currentTarget.value)
  },[])

  const artistText = useMemo(()=>{
    return artistList?.reduce((acc, cur)=> `${acc}, ${cur}`)
  },[artistList])


  return (
    <TemplateA>
      <Head>
        <title>Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex sx={{width: ["100%", null, null, "90%"], p: 4}}>
        
        { !page ? <Text> no album</Text> : (
          <Flex 
            sx={{
              flexDirection: "row", 
              justifyContent: "center", 
              alignItems: "center", // TODO: not stretch as I want...
              width: "100%", 
              maxWidth: "900px"
            }}
          >
            <Box sx={{width: "33%"}}>
              <Ratio>
                {/* TODO: add border-radius to image */}
                {src &&
                  <Image 
                    layout={"responsive"} width={"100%"} height={"100%"} 
                    alt={`album cover of ${title}`} 
                    src={src}
                  />
                }
              </Ratio>
            </Box>
          
            <Box sx={{width: "66%", height: "100%"}}>
              <Flex sx={{height: "100%"}}>
                <Heading as={"h1"} sx={{fontSize: ["1.4rem", "1.6rem", "2rem", null]}} >{title}</Heading>
                <Text sx={{fontSize: "1.3rem"}}>{artistText}</Text>
                <Text sx={{fontSize: "1.2rem", color: ColorKey["text.weak"]}}>{dateText}</Text>
                <Flex sx={{flexDirection: "row", width: "auto", marginTop: 4,}}>
                  <Link to={"/music"} sx={badgeSx}>
                    <Text>{rating}</Text>
                  </Link>
                  <Link href={rym} sx={badgeSx}>
                    <Text>RYM</Text>
                  </Link>
                  <Box>
                    <Text>

                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>

          </Flex>
        )}

        <Divider sx={{width: "100%"}}/>

        <Box sx={{width: "100%"}}>
          <Flex>
            <Flex sx={{flexDirection: "row", width: "auto"}}>
              {[availableReviewLanguageList.map(item=>(
                <Button 
                  key={`language-button-${item}`} 
                  onClick={()=>onClickReviewLanguageButton(item)}
                  sx={{
                    backgroundColor: isThisLanguageSelected(item) ? ColorKey["bg.weak"] : "transparent",
                    color: isThisLanguageSelected(item) ? ColorKey["text.strong"] : ColorKey["text.weak"],
                    margin: 2,
                  }}
                >
                  {item}
                </Button>
              ))]}
            </Flex>
            <Box>
              {isEditingReview
                ? <>
                  <Button onClick={onClickSave}>{"Save"}</Button>
                  <Button onClick={onClickCancel}>{"Cancel"}</Button>
                </>
                : hasPermission("EDIT_REVIEW") 
                  ? <Button onClick={onClickEdit}>{"Edit"}</Button>
                  : null
              }
            </Box>
            <Box sx={{padding: 4, marginTop: 4, width: "100%"}}>
              {isEditingReview
                ? <Textarea value={editingReview} sx={{height: 600}} onChange={onChangeReview}></Textarea>
                : <Paragraph sx={{padding: "5px"}}>{showingReview}</Paragraph>
              }
            </Box>
          </Flex>
        </Box>
    
      </Flex>
    </TemplateA>
  )
}

export  const getServerSideProps: GetServerSideProps = async (context) => {
   
  try { 
    const musicAlbumId = context?.params?.id;

    if (typeof musicAlbumId !== "string") throw Error("id of album is not valid");

    const page = await notion.pages.retrieve({page_id: musicAlbumId || ""});

    return {props: { 
      page,
    }}
  }
  catch {
    return {props: { 
      page: null, 
    }}
  }
}


