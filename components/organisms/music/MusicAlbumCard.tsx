import React, { useMemo } from "react"

import {Box, Flex, Link, Image,Ratio, Text} from "components/atoms"
import {ColorKey} from "theme"
import {MusicAlbumData, MusicAlbumRating} from "utils/notion/music"
import { CardBadge } from "components/molecules/CardBadge"


export type MusicMusicAlbumCardProps = {
    data: MusicAlbumData
  }

const ReviewIndicatorBox = () => {
  return (
    <Box sx={{width: "33%", height: "3px", backgroundColor: ColorKey["text.weak"]}}></Box>
  )
}

export const MusicAlbumCard: React.FunctionComponent<MusicMusicAlbumCardProps> = ({
  data
}) => {

  const {title, artistList, key, src, rating, released, tagList, reviewKor, reviewEng, reviewJpn} = data.essence || {};

  const badgeBgColorKey = useMemo(()=>{
    if (rating === MusicAlbumRating.THE_BEST) return ColorKey["badge.rating.the-best.bg"]
    else if (rating === MusicAlbumRating.TOP_10) return ColorKey["badge.rating.top-10.bg"]
    else if (rating === MusicAlbumRating.TOP_50) return ColorKey["badge.rating.top-50.bg"]
    else if (rating === MusicAlbumRating.TOP_100) return ColorKey["badge.rating.top-100.bg"]
    else if (rating === MusicAlbumRating.TOP_200) return ColorKey["badge.rating.top-200.bg"]
    else if (rating === MusicAlbumRating.TOP_500) return ColorKey["badge.rating.top-500.bg"]
    else return ColorKey["badge.rating.top-500.bg"]
  },[rating])

  const artistText = useMemo(()=>{
    return artistList?.reduce((acc, cur)=> `${acc}, ${cur}`)
  },[artistList])

  return (
    <Flex>
      <Link to={`/music/${data.id}`} sx={{width: "100%"}}>
        <Box sx={{width: "100%"}} >
          <Box
            sx={{
              position: "absolute", 
              zIndex: 2,
              left: 0,
              top: 0,
            }}
          >
            <CardBadge title={rating || ""} color={badgeBgColorKey}></CardBadge>
          </Box>
          
          <Flex sx={{backgroundColor: ColorKey["image.placeholder.bg"]}}>
            {src 
              ? <Image width={"100%"} height={"auto"} alt={`album cover of ${title}`} src={src}/>
              : <Ratio/>
            }
          </Flex>
        </Box >

        <Box sx={{my:3, width: "100%", backgroundColor: ColorKey["card.bg"]}}>
          <Flex>
            <Text sx={{fontSize: "1.1rem", px: 3, py: 1, color: ColorKey["text.strong"]}}>
              {title}
            </Text>
            <Text sx={{px: 3, py: 0, color: ColorKey["text.weak"]}}>
              {artistText}
            </Text>
          </Flex>
        </Box>

        <Flex sx={{flexDirection: "row", justifyContent: "space-between"}}>
          {reviewEng && <ReviewIndicatorBox></ReviewIndicatorBox>}
          {reviewKor && <ReviewIndicatorBox></ReviewIndicatorBox>}
          {reviewJpn && <ReviewIndicatorBox></ReviewIndicatorBox>}
        </Flex>

      </Link>
    </Flex>   
  )
}
