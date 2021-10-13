import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {Box, Flex, Link, NextImage,Ratio, Text} from "components/atoms"
import {MusicAlbumCard} from "components/organisms/music/MusicAlbumCard"
import {SEARCH_BAR_CONTAINER_HEIGHT} from "pages/music"
import {MusicAlbumData, MusicAlbumRating, MusicAlbumTag} from "utils/notion/music"


export type MusicMusicAlbumCardDisplayProps = {
  albumDataList: MusicAlbumData[]
}


export const MusicAlbumCardDisplay: React.FunctionComponent<MusicMusicAlbumCardDisplayProps> = React.memo(({
  albumDataList
}) => {

  return (
    <Flex 
      sx={{
        p: 3, 
        flexDirection: "row", 
        justifyContent: "flex-start",
        alignItems: "flex-start",

        flexWrap: "wrap",
        pt: SEARCH_BAR_CONTAINER_HEIGHT,
      }}
    >
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
          ></MusicAlbumCard>
        </Box>
      ))}
    </Flex> 
  )
})

MusicAlbumCardDisplay.displayName = "MusicAlbumCardDisplay"