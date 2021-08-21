import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {Page} from "@notionhq/client/build/src/api-types"
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
    else return ColorKey["card.strong.bg"]
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
              height: "40px", 
              px: 3,
              py: 2,
              backgroundColor: badgeBgColorKey, 
              color: ColorKey["card.strong.text"],
              zIndex: 2,
              opacity: 0.8,
            }}
          >
            <Flex sx={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Text sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}>
                {rating}
              </Text>
            </Flex>
          </Box>

          <Ratio>
            {src &&
            <NextImage layout={"responsive"} width={"100%"} height={"100%"} alt={`album cover of ${title}`} src={src}/>
            }
          </Ratio>
        </Box >

        <Box sx={{py:4, width: "100%", color: ColorKey["card.strong.text"], backgroundColor: ColorKey["card.strong.bg"]}}>
          <Flex>
            <Text sx={{fontSize: "1.1rem", px: 3, py: 1}}>
              {title}
            </Text>
            <Text sx={{px: 3, py: 1}}>
              {artist}
            </Text>
          </Flex>
        </Box>
      </LocalLink>
    </Flex>   
  )
}
