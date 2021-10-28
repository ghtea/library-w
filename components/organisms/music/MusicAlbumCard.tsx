import React, {useMemo} from "react"

import {Box, Flex, Image,Link, Ratio, Text} from "components/atoms"
import {CardBand} from "components/molecules/CardBand"
import {ColorKey, Sx} from "theme"
import {MusicAlbumData, MusicAlbumRating} from "utils/query"


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

  const {title, artistList, key, src, rating, released, tags, reviewKor, reviewEng, reviewJpn} = data.essence || {};

  const CardBandSx = useMemo(()=>{
    const sx: Sx = {}
    if (rating === MusicAlbumRating.THE_BEST) {
      sx.color = ColorKey["card-band.rating.the-best.text"],
      sx.backgroundColor = ColorKey["card-band.rating.the-best.bg"]
    }
    else if (rating === MusicAlbumRating.TOP_10) {
      sx.color = ColorKey["card-band.rating.top-10.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-10.bg"]
    }
    else if (rating === MusicAlbumRating.TOP_50) {
      sx.color = ColorKey["card-band.rating.top-50.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-50.bg"]
    }
    else if (rating === MusicAlbumRating.TOP_100) {
      sx.color = ColorKey["card-band.rating.top-100.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-100.bg"]
    }
    else if (rating === MusicAlbumRating.TOP_200) {
      sx.color = ColorKey["card-band.rating.top-200.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-200.bg"]
    }
    else if (rating === MusicAlbumRating.TOP_500) {
      sx.color = ColorKey["card-band.rating.top-500.text"],
      sx.backgroundColor = ColorKey["card-band.rating.top-500.bg"]
    }
    return sx
  },[rating])

  const artistText = useMemo(()=>{
    return artistList?.reduce((acc, cur)=> `${acc}, ${cur}`)
  },[artistList])

  return (
    <Flex>
      <Link to={`/music/${data.id}`} sx={{width: "100%"}}>
        <Flex>
          <CardBand title={(rating || "").toUpperCase()} sx={CardBandSx}></CardBand>
          <Flex sx={{backgroundColor: ColorKey["image.placeholder.bg"]}}>
            <Image width={"100%"} height={"auto"} alt={`album cover of ${title}`} src={src} fallbackSrc={"/images/album-cover.jpeg"}/>
          </Flex>
        </Flex >

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
