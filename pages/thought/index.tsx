import {useCallback, useEffect, useMemo, useState} from "react"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {Page} from "@notionhq/client/build/src/api-types"
import {Flex} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import Head from "next/head"
import Image from "next/image"
import {notion} from "utils/query"
// import { ThoughtAlbumPropertyValueMap } from "tools/notion/types"


export type ThoughtProps = {
  // database: DatabasesQueryResponse | null;
  // notionFileUrlPrefix?: string;
}

// export type ThoughtAlbum = Page & {
//   properties: ThoughtAlbumPropertyValueMap; // PropertyValueMap
// }

export default function Thought({
  // database,
  // notionFileUrlPrefix
}:ThoughtProps) {
  
  return (
    <TemplateA>
      <Head>
        <title>Thought / w</title>
        <meta name="description" content="Thought" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        sx={{p: 4}}
      >

        <Flex >
          Thought
        </Flex>
        
      </Flex>
    </TemplateA>
    
  )
}
