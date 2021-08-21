import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {Box, Flex, LocalLink, NextImage,Ratio, Text} from "components/atoms"
import {MusicAlbumData, MusicAlbumRating, MusicAlbumTag} from "pages/music/types"
import {ColorKey} from "theme"
import {zIndex} from "theme/space"


export type MusicMusicAlbumCardProps = {
    data: MusicAlbumData
  }

export const MusicAlbumCard: React.FunctionComponent<MusicMusicAlbumCardProps> = ({
  data
}) => {

  const {title, artist, key, src, rating, released, tags, reviewKor, reviewEng} = data.essence || {};

  const badgeBgColorKey = useMemo(()=>{
    if (rating === MusicAlbumRating.THE_BEST) return ColorKey["badge.rating.the-best.bg"]
    else if (rating === MusicAlbumRating.TOP_10) return ColorKey["badge.rating.top-10.bg"]
    else if (rating === MusicAlbumRating.TOP_50) return ColorKey["badge.rating.top-50.bg"]
    else if (rating === MusicAlbumRating.TOP_100) return ColorKey["badge.rating.top-100.bg"]
    else if (rating === MusicAlbumRating.TOP_200) return ColorKey["badge.rating.top-200.bg"]
    else if (rating === MusicAlbumRating.TOP_500) return ColorKey["badge.rating.top-500.bg"]
    else return ColorKey["badge.rating.top-500.bg"]
  },[rating])

  return (
    <Flex>
      <LocalLink to={`/music/${data.id}`} sx={{width: "100%"}}>
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
              {artist}
            </Text>
          </Flex>
        </Box>
      </LocalLink>
    </Flex>   
  )
}
