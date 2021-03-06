import {useCallback, useEffect, useMemo, useState} from "react"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {Page} from "@notionhq/client/build/src/api-types"
import {Flex} from "components/atoms"
import {TemplateA} from "components/templates/TemplateA"
import Head from "next/head"
import {notion} from "utils/query"
// import { KnowledgeAlbumPropertyValueMap } from "tools/notion/types"


export type KnowledgeProps = {
  // database: DatabasesQueryResponse | null;
  // notionFileUrlPrefix?: string;
}

// export type KnowledgeAlbum = Page & {
//   properties: KnowledgeAlbumPropertyValueMap; // PropertyValueMap
// }

export default function Knowledge({
  // database,
  // notionFileUrlPrefix
}:KnowledgeProps) {
  
  return (
    <TemplateA>
      <Head>
        <title>Knowledge / w</title>
        <meta name="description" content="Knowledge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        sx={{p: 4}}
      >

        <Flex >
          Knowledge
        </Flex>
        
      </Flex>
    </TemplateA>
    
  )
}
