import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {Page} from "@notionhq/client/build/src/api-types"
import {Box, Flex, Link, NextImage,Ratio, Text} from "components/atoms"
import {ColorKey} from "theme"
import {zIndex} from "theme/space"
import {MovieData, MovieRating} from "tools/types/movie"


export type MovieCardProps = {
    data: MovieData
  }

export const MovieCard: React.FunctionComponent<MovieCardProps> = ({
  data
}) => {

  const {title, director, key, src, rating, year, tags, reviewKor, reviewEng, reviewJpn} = data.essence || {};

  const badgeBgColorKey = useMemo(()=>{
    if (rating === MovieRating.THE_BEST) return ColorKey["badge.rating.the-best.bg"]
    else if (rating === MovieRating.TOP_10) return ColorKey["badge.rating.top-10.bg"]
    else if (rating === MovieRating.TOP_50) return ColorKey["badge.rating.top-50.bg"]
    else if (rating === MovieRating.TOP_100) return ColorKey["badge.rating.top-100.bg"]
    else if (rating === MovieRating.TOP_200) return ColorKey["badge.rating.top-200.bg"]
    else if (rating === MovieRating.TOP_500) return ColorKey["badge.rating.top-500.bg"]
    else return ColorKey["card.bg"]
  },[rating])

  return (
    <Flex>
      <Link to={`/movie/${data.id}`} sx={{width: "100%"}}>
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
              color: ColorKey["text.strong"],
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
          <Box sx={{width: "100%"}}>
            {src &&
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={`movie poster of ${title}`} style={{width: "100%"}}/>
            }
          </Box>
        </Box >

        <Box sx={{py:4, width: "100%", color: ColorKey["text.strong"], backgroundColor: ColorKey["card.bg"]}}>
          <Flex>
            <Text sx={{fontSize: "1.1rem", px: 3, py: 1}}>
              {title}
            </Text>
            <Text sx={{px: 3, py: 1}}>
              {director}
            </Text>
          </Flex>
        </Box>
      </Link>
    </Flex>   
  )
}
