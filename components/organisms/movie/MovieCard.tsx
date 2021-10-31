import React, {useMemo} from "react"

import {Box, Flex, Image, Link, Ratio, Text} from "components/atoms"
import {CardBand} from "components/molecules/CardBand"
import placeHolderSrc from "public/images/movie-poster.jpeg"
import {ColorKey, Sx} from "theme"
import {MovieData, MovieRating} from "utils/query"

export type MovieCardProps = {
    data: MovieData
  }

export const MovieCard: React.FunctionComponent<MovieCardProps> = ({
  data
}) => {
  const {title, director, key, src, rating, year, tags, reviewKor, reviewEng, reviewJpn} = data.essence || {};

  const CardBandSx = useMemo(()=>{
    const sx: Sx = {}
    if (rating === MovieRating.THE_BEST) {
      sx.color = ColorKey["card-band.rating.the-best.text"],
      sx.backgroundColor = ColorKey["card-band.rating.the-best.bg"]
    }
    else if (rating === MovieRating.TOP_10) {
      sx.color = ColorKey["card-band.rating.top-10.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-10.bg"]
    }
    else if (rating === MovieRating.TOP_50) {
      sx.color = ColorKey["card-band.rating.top-50.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-50.bg"]
    }
    else if (rating === MovieRating.TOP_100) {
      sx.color = ColorKey["card-band.rating.top-100.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-100.bg"]
    }
    else if (rating === MovieRating.TOP_200) {
      sx.color = ColorKey["card-band.rating.top-200.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-200.bg"]
    }
    else if (rating === MovieRating.TOP_500) {
      sx.color = ColorKey["card-band.rating.top-500.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-500.bg"]
    }
    return sx
  },[rating])

  return (
    <Flex>
      <Link to={`/movie/${data.id}`} sx={{width: "100%"}}>
        <Flex>
          <CardBand title={(rating || "").toUpperCase()} sx={CardBandSx}></CardBand>
          <Flex>
            <Image 
              width={"100%"} 
              height={"auto"} 
              alt={`movie poster of ${title}`} 
              src={src} 
              placeholder={<Ratio ratio={0.8} sx={{backgroundColor: ColorKey["image.placeholder.bg"]}} />}
              fallbackSrc={"/images/movie-poster.jpeg"}
            />
          </Flex>
        </Flex >

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
