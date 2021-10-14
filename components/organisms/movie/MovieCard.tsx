import React, { useMemo } from "react"

import {Box, Flex, Link, Image, Ratio, Text} from "components/atoms"
import {ColorKey} from "theme"
import {MovieData, MovieRating} from "utils/notion/movie"
import { CardBadge } from "components/molecules/CardBadge"

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
              zIndex: 2,
              left: 0,
              top: 0,
            }}
          >
            <CardBadge title={rating || ""} color={badgeBgColorKey}></CardBadge>
          </Box>

          <Flex sx={{backgroundColor: ColorKey["image.placeholder.bg"]}}>
            <Image width={"100%"} height={"auto"} alt={`movie poster of ${title}`} src={src} fallbackSrc={"/images/movie-poster.jpeg"}/>
          </Flex>
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
