import {ChangeEventHandler, useCallback, useEffect, useMemo, useState} from "react"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {Box, Flex} from "components/atoms"
import {MusicAlbumCard} from "components/organisms/music/MusicAlbumCard"
import {TemplateA1} from "components/templates/TemplateA1"
import {FilterValue, FilterValueItem} from "components/templates/TemplateA1/FilterInput"
import {SearchInput} from "components/templates/TemplateA1/SearchInput"
import Fuse from "fuse.js"
import Head from "next/head"
import {useInput} from "utils/dom"
import {useDebouncedEffect} from "utils/optimization"
import {getMusicAlbumRatingOrder, MusicAlbumData, MusicAlbumRating, MusicAlbumTag,notion, notionFileUrlPrefix} from "utils/query"


export type MusicProps = {
  database: DatabasesQueryResponse | null;
}

const getSrc = (key: string | undefined, notionFileUrlPrefix: string, tags: MusicAlbumTag[]) => {
  if (tags?.includes(MusicAlbumTag.BLOCKED_COVER)){
    return `${notionFileUrlPrefix}/music-album-covers/blocked.jpg` 
  }
  else {
    return key ? `${notionFileUrlPrefix}/music-album-covers/${key}.jpg` : undefined
  }
}

export const refineAlbumData = (item: MusicAlbumData) => {

  const artistList = (item.properties.Artist?.multi_select || []).map(item=>item.name) as string[]; 

  const rating = item.properties.Rating?.select.name as MusicAlbumRating;

  const releasedString = item.properties.Released?.date.start; // "1990-7-10"
  const released = releasedString ? Date.parse(releasedString) : undefined

  const rym = item.properties.RYM?.url;

  const reviewKor = item.properties["Review KOR"]?.rich_text[0]?.plain_text;
  const reviewEng = item.properties["Review ENG"]?.rich_text[0]?.plain_text;
  const reviewJpn = item.properties["Review JPN"]?.rich_text[0]?.plain_text;

  const tags = (item.properties.Tags?.multi_select || []).map(item=>item.name) as MusicAlbumTag[]; 
  const title = item.properties.Title?.title[0].plain_text;

  const key = item.properties.Key?.rich_text[0]?.plain_text;

  const src = getSrc(key, notionFileUrlPrefix, tags);

  const performer = item.properties.Key?.rich_text[0]?.plain_text;

  return ({
    ...item,
    essence: {
      artistList,
      rating,
      released,
      rym,
      tags,
      title,
      key,
      src,
      performer,
      reviewKor,
      reviewEng,
      reviewJpn,
    }
  })
}

const DEFAULT_FILTER_VALUE = [...Object.values(MusicAlbumRating)]
  .map(item => ({
    value: item,
    selected: true,
  }))

export type MusicAlbumFilterValue = (Omit<FilterValueItem, "value"> & {
  value: MusicAlbumRating
})[]

const FUSE_OPTIONS = {
  keys: [
    {
      name: "essence.title",
      weight: 12,
    },
    {
      name: "essence.artistList",
      weight: 8,
    },
    {
      name: "essence.rating",
      weight: 4,
    },
    {
      name: "essence.released",
      weight: 4,
    },
    "essence.tags",
    "essence.performer",
    "essence.reviewKor",
    "essence.reviewEng",
    "essence.reviewJpn",
  ]
}



export default function Music({
  database,
}:MusicProps) {
  const searchInput = useInput("")
  const {props: searchInputProps, state: searchInputState} = searchInput

  const [actualSearchValue, setActualSearchValue] = useState("");
  const [albumDataList, setAlbumDataList] = useState<MusicAlbumData[]>([])
  const [filterValue, setFilterValue] = useState<MusicAlbumFilterValue>(DEFAULT_FILTER_VALUE);

  const updateAlbumDataList = useCallback(()=>{ 
    const existingAlbumDataList = database?.results.filter((item: MusicAlbumData) => {
      const title = item.properties.Title?.title[0]?.plain_text;
      return title ? true : false
    })

    const refinedAlbumDataList: MusicAlbumData[] = (existingAlbumDataList || []).map(refineAlbumData)

    const fuse = new Fuse(refinedAlbumDataList, FUSE_OPTIONS) 

    const searchedAlbumDataList = !actualSearchValue 
      ? refinedAlbumDataList
      : fuse.search(actualSearchValue).map(item => item.item)

    const filterSelectedValues = filterValue.filter(item =>item.selected).map(item=>item.value)
    const filteredMovieDataList = searchedAlbumDataList.filter(item => {
      return item.essence?.rating && filterSelectedValues.includes(item.essence?.rating)
    })
    
    const sortedAlbumDataList = filteredMovieDataList.sort((a, b)=>{
      if (a.essence?.rating && b.essence?.rating){
        return (getMusicAlbumRatingOrder(b.essence.rating) - getMusicAlbumRatingOrder(a.essence.rating))
      }
      else { 
        return 0 
      }
    });

    setAlbumDataList(sortedAlbumDataList)
  }, [database?.results, actualSearchValue, filterValue]);
  
  useEffect(()=>{
    updateAlbumDataList()
  }, [updateAlbumDataList])

  useDebouncedEffect(()=>{
    setActualSearchValue(searchInputProps.value)
  }, [searchInputProps.value], 500)

  const onChangeFilter = useCallback((newValue: FilterValue)=>{
    setFilterValue(newValue)
  },[])

  const filterText = useCallback((item: MusicAlbumFilterValue[number]) => {
    if (item.value === MusicAlbumRating.THE_BEST){
      return "The Best"
    }
    else if (item.value === MusicAlbumRating.TOP_10){
      return "TOP 10"
    }
    else if (item.value === MusicAlbumRating.TOP_50){
      return "TOP 50"
    }
    else if (item.value === MusicAlbumRating.TOP_100){
      return "TOP 100"
    }
    else if (item.value === MusicAlbumRating.TOP_200){
      return "TOP 200"
    }
    else if (item.value === MusicAlbumRating.TOP_500){
      return "TOP 500"
    }
    else {
      return ""
    }
  },[])

  return (
    <TemplateA1
      searchInputProps={{
        input: searchInput
      }}
      filterInputProps={{
        text: filterText,
        value: filterValue,
        onChange: onChangeFilter,
      }}
    >
      <Head>
        <title>Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex sx={{
        p: 3, 
        flexDirection: "row", 
        justifyContent: "center", 
        flexWrap: "wrap", 
        alignItems: "flex-start"
      }}>
        {albumDataList?.map((item, index)=>(
          <Box
            key={`album-${item?.essence?.title || index}`} 
            sx={{
              lineHeight: 0, 
              p: 4,
              width: ["calc(100% / 2)", "calc(100% / 3)", "calc(100% / 5)", "calc(100% / 7)"],
            }}
          >
            <MusicAlbumCard
              data={item}
            />
          </Box>
        ))}
      </Flex>
    </TemplateA1>
  )
}

export async function getServerSideProps() {
   
  try { 
    const database = await notion.databases.query({database_id: process.env.NEXT_PUBLIC_NOTION_MUSIC_DB_ID || ""});
    return {props: { 
      database,
    }}
  }
  catch {
    return {props: { 
      database: null, 
    }}
  }
}