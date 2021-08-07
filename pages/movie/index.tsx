import { useCallback, useEffect, useMemo, useState } from "react"

import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints"
import { Page } from "@notionhq/client/build/src/api-types"
import { Flex } from "components/atoms/Flex"
import { TemplateA } from "components/templates/TemplateA"
import Head from "next/head"
import Image from "next/image"
import { notion } from "tools/notion"
// import { MovieAlbumPropertyValueMap } from "tools/notion/types"


export type MovieProps = {
  // database: DatabasesQueryResponse | null;
  // notionFileUrlPrefix?: string;
}

// export type MovieAlbum = Page & {
//   properties: MovieAlbumPropertyValueMap; // PropertyValueMap
// }

export default function Movie({
  // database,
  // notionFileUrlPrefix
}:MovieProps) {
  
  return (
    <TemplateA>
      <Head>
        <title>Movie / w</title>
        <meta name="description" content="Movie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        sx={{p: 4}}
      >

        <Flex >
          Movie
        </Flex>
        
      </Flex>
    </TemplateA>
    
  )
}
