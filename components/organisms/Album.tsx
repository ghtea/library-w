import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { Page } from "@notionhq/client/build/src/api-types"
import { Box } from "components/atoms/Box"
import { Flex } from "components/atoms/Flex"
import { Ratio } from "components/atoms/Ratio"
import { Text } from "components/atoms/Text"
import Image from "next/image"
import { AlbumData } from "pages/music"
import { ColorKey } from "theme"
import { zIndex } from "theme/space"


export type AlbumProps = {
    data: AlbumData
    notionFileUrlPrefix?: string
  }

export const Album: React.FunctionComponent<AlbumProps> = ({
  data, 
  notionFileUrlPrefix
}) => {

  const { title, artist, key, src } = useMemo(()=>{
    const title = data.properties.Name?.title[0].plain_text;
    const artist = data.properties.Artist?.rich_text[0]?.plain_text;

    const key = data.properties.Key?.rich_text[0]?.plain_text;
    const src = key ? `${notionFileUrlPrefix}/music-album-covers/${key}.jpg` : undefined;
    
    return ({
      title,
      artist,
      key,
      src
    })
  },[data, notionFileUrlPrefix])


  return (
    <Flex >

      <Box sx={{width: "100%"}} >
        <Box
          sx={{
            position: "absolute", 
            left: 0,
            top: 0,
            height: "40px", 
            px: 3,
            py: 2,
            backgroundColor: ColorKey["card.strong.bg"], 
            color: ColorKey["card.strong.text"],
            zIndex: 2,
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
              {"10"}
            </Text>
            <Text sx={{
              ml: 2,
              fontSize: "1.2rem",
            }}>
              {"th"}
            </Text>
          </Flex>
        </Box>

        <Ratio>
          {src &&
            <Image layout={"responsive"} width={"100%"} height={"100%"} alt={`album cover of ${title}`} src={src}/>
          }
        </Ratio>
      </Box >

      <Box sx={{ py:4, width: "100%", color: ColorKey["card.strong.text"], backgroundColor: ColorKey["card.strong.bg"]}}>
        <Flex>
          <Text sx={{fontSize: "1.1rem", px: 3, py: 1}}>
            {title}
          </Text>
          <Text sx={{ px: 3, py: 1}}>
            {artist}
          </Text>
        </Flex>
      </Box>

    </Flex>   
  )
}
