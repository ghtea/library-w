import React, { useCallback, useEffect, useMemo, useState } from "react"

import { PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints"
import { NumberFormulaValue, Page } from "@notionhq/client/build/src/api-types"
import { Box } from "components/atoms/Box"
import { Flex } from "components/atoms/Flex"
import { Ratio } from "components/atoms/Ratio"
import { Text } from "components/atoms/Text"
import { AlbumCard } from "components/organisms/music/AlbumCard"
import { TemplateA } from "components/templates/TemplateA"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { AlbumData, refineAlbumData } from "pages/music"
import { notion } from "tools/notion"
import { MusicAlbumPropertyValueMap } from "tools/notion/types"


export type MusicAlbumProps = {
  page: PagesRetrieveResponse | null;
}


export default function MusicAlbum({
  page,
}:MusicAlbumProps) {
  
  const albumData: AlbumData | null = useMemo(
    ()=> page ?  refineAlbumData(page) : null, 
    [page] 
  );

  const {title, artist, key, src, score, rank} = useMemo(
    ()=> albumData ? (albumData.essence || {}) : {},[albumData]
  )
  
  return (
    <TemplateA>
      <Head>
        <title>Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        
        { !page && <Text> no album</Text> }
        {page && (
          <Flex>
            <Ratio>
              {src &&
              <Image layout={"responsive"} width={"100%"} height={"100%"} alt={`album cover of ${title}`} src={src}/>
              }
            </Ratio>
          </Flex>
        )}
    
      </Flex>
    </TemplateA>
  )
}

export  const getServerSideProps: GetServerSideProps = async (context) => {
   
  try { 
    const musicAlbumId = context?.params?.id;

    if (typeof musicAlbumId !== "string") throw Error("id of album is not valid");

    const page = await notion.pages.retrieve({ page_id: musicAlbumId || "" });

    console.log(page);

    return { props: { 
      page,
    } }
  }
  catch {
    return { props: { 
      page: null, 
    }}
  }
}


