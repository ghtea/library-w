import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {Box, Flex, Link, NextImage,Ratio, Text} from "components/atoms"
import {ColorKey} from "theme"
import {zIndex} from "theme/space"
import {MusicAlbumData, MusicAlbumRating, MusicAlbumTag} from "utils/notion/music"


export type MusicMusicAlbumCardProps = {
    data: MusicAlbumData
  }

export const MusicAlbumCard: React.FunctionComponent<MusicMusicAlbumCardProps> = ({
  data
}) => {

  const {title, artistList, key, src, rating, released, tagList, reviewKor, reviewEng} = data.essence || {};

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
              left: 0,
              top: 0,
              height: "32px", 
              px: 3,
              py: 1,
              backgroundColor: badgeBgColorKey, 
              color: ColorKey["badge.rating.text"],
              zIndex: 2,
              opacity: 0.8,
            }}
          >
            <Flex sx={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Text sx={{
                fontSize: "1rem",
                fontWeight: "bold",
              }}>
                {rating}
              </Text>
            </Flex>
          </Box>
          
          <Box sx={{backgroundColor: ColorKey["image.placeholder.bg"]}}>
            <Ratio>
              {src &&
              <NextImage layout={"responsive"} width={"100%"} height={"100%"} alt={`album cover of ${title}`} src={src}/>
              }
            </Ratio>
          </Box>
        </Box >

        <Box sx={{py:2, width: "100%", backgroundColor: ColorKey["card.bg"]}}>
          <Flex>
            <Text sx={{fontSize: "1.1rem", px: 3, py: 1, color: ColorKey["text.strong"]}}>
              {title}
            </Text>
            <Text sx={{px: 3, py: 0, color: ColorKey["text.weak"]}}>
              {artistText}
            </Text>
          </Flex>
        </Box>
      </Link>
    </Flex>   
  )
}
