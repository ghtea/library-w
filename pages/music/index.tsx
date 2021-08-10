import { useCallback, useEffect, useMemo, useState } from "react"

import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints"
import { NumberFormulaValue, Page } from "@notionhq/client/build/src/api-types"
import { Box } from "components/atoms/Box"
import { Flex } from "components/atoms/Flex"
import { AlbumCard } from "components/organisms/music/AlbumCard"
import { TemplateA } from "components/templates/TemplateA"
import Head from "next/head"
import { notion, notionFileUrlPrefix } from "tools/notion"
import { MusicAlbumPropertyValueMap } from "tools/notion/types"


export type MusicProps = {
  database: DatabasesQueryResponse | null;
}

export type AlbumData = Page & {
  properties: MusicAlbumPropertyValueMap; // PropertyValueMap
  essence?: AlbumEssence
}

export type AlbumEssence = {
  title?: string;
  artist?: string;
  key?: string;
  src?: string;
  score?: number;
  rank?: number;
  rym?: string;
  released?: number;
}

export const refineAlbumData = (item: AlbumData) => {
  const title = item.properties.Name?.title[0].plain_text;
  const artist = item.properties.Artist?.rich_text[0]?.plain_text;

  const key = item.properties.Key?.rich_text[0]?.plain_text;
  const src = key ? `${notionFileUrlPrefix}/music-album-covers/${key}.jpg` : undefined;
  const rym = item.properties.RYM?.url;

  const releasedString = item.properties.Released?.date.start; // "1990-7-10"
  const released = releasedString ? Date.parse(releasedString) : undefined

  const score = ((item.properties.Score?.formula as NumberFormulaValue) || {}).number;

  return ({
    ...item,
    essence: {
      title,
      artist,
      released,
      key,
      src,
      score,
      rym,
    }
  })
}


export default function Music({
  database,
}:MusicProps) {
  
  const albumDataList: AlbumData[] = useMemo(()=>{ 
    const filteredAlbumDataList = database?.results.filter((item: AlbumData) => {
      const name = item.properties.Name?.title[0]?.plain_text;
      return name ? true : false
    })

    console.log("raw album-list: ", filteredAlbumDataList)

    const refinedAlbumDataList = (filteredAlbumDataList || []).map(refineAlbumData)

    const sortedAlbumDataList = refinedAlbumDataList.sort((a, b)=>{
      return ((b.essence.score || 0) - (a.essence.score || 0))
    });

    const addedAlbumDataList = sortedAlbumDataList.map((item, index)=>{
      return ({
        ...item,
        essence: {
          ...item.essence,
          rank: index + 1,
        }
      })
    });

    return addedAlbumDataList
  }, [database?.results]);

  return (
    <TemplateA>
      <Head>
        <title>Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>

        <Flex sx={{ p: 3, flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
          {albumDataList?.map((item, index)=>(
            <Box
              key={`album-${item?.essence?.title || index}`} 
              sx={{
                lineHeight: 0, 
                p: 4,
                width: ["50%", "33%", "20%", "240px"],
              }}
            >
              <AlbumCard
                data={item}
              ></AlbumCard>
            </Box>
          )
          )}
        </Flex>
        
      </Flex>
    </TemplateA>
  )
}

export async function getServerSideProps() {
   
  try { 
    const database = await notion.databases.query({ database_id: process.env.NOTION_MUSIC_DB_ID || "" });
    return { props: { 
      database,
    } }
  }
  catch {
    return { props: { 
      database: null, 
    }}
  }
}