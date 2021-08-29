import {useCallback, useEffect, useMemo, useState} from "react"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {Box, Flex} from "components/atoms"
import {MovieCard} from "components/organisms/movie/MovieCard"
import {TemplateA} from "components/templates/TemplateA"
import Head from "next/head"
import {getMovieRatingOrder, MovieData, MovieRating, MovieTag,notion, notionFileUrlPrefix} from "utils/notion"



export type MovieProps = {
  database: DatabasesQueryResponse | null;
}

const getSrc = (key: string | undefined, notionFileUrlPrefix: string, tags: MovieTag[]) => {
  return key ? `${notionFileUrlPrefix}/movie-posters/${key}.jpg` : undefined
}

export const refineMovieData = (item: MovieData) => {

  const director = item.properties.Director?.rich_text[0]?.plain_text;
  
  const rating = item.properties.Rating?.select.name as MovieRating;

  const year = item.properties.Year?.number;

  const rym = item.properties.RYM?.url;

  const reviewKor = item.properties["Review KOR"]?.rich_text[0]?.plain_text;
  const reviewEng = item.properties["Review ENG"]?.rich_text[0]?.plain_text;
  const reviewJpn = item.properties["Review JPN"]?.rich_text[0]?.plain_text;

  const tags = (item.properties.Tags?.multi_select || []).map(item=>item.name) as MovieTag[]; 
  const title = item.properties.Title?.title[0].plain_text;

  const key = item.properties.Key?.rich_text[0]?.plain_text;

  const src = getSrc(key, notionFileUrlPrefix, tags);

  return ({
    ...item,
    essence: {
      director,
      rating,
      year,
      rym,
      tags,
      title,
      key,
      src,
      reviewKor,
      reviewEng,
      reviewJpn,
    }
  })
}


export default function Movie({
  database,
}:MovieProps) {
  
  const movieDataList: MovieData[] = useMemo(()=>{ 
    const filteredMovieDataList = database?.results.filter((item: MovieData) => {
      const title = item.properties.Title?.title[0]?.plain_text;
      return title ? true : false
    })

    console.log("raw movie-list: ", filteredMovieDataList)

    const refinedMovieDataList = (filteredMovieDataList || []).map(refineMovieData)

    const sortedMovieDataList = refinedMovieDataList.sort((a, b)=>{
      return (getMovieRatingOrder(b.essence.rating) - getMovieRatingOrder(a.essence.rating))
    });

    return sortedMovieDataList
  }, [database?.results]);

  return (
    <TemplateA>
      <Head>
        <title>Movie</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>

        <Flex sx={{p: 3, flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", alignItems: "flex-start"}}>
          {movieDataList?.map((item, index)=>(
            <Box
              key={`album-${item?.essence?.title || index}`} 
              sx={{
                lineHeight: 0, 
                p: 4,
                width: ["calc(100% / 2)", "calc(100% / 3)", "calc(100% / 5)", "240px"],
              }}
            >
              <MovieCard
                data={item}
              ></MovieCard>
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
    const database = await notion.databases.query({database_id: process.env.NEXT_PUBLIC_NOTION_MOVIE_DB_ID || ""});
    return {props: { 
      database,
    }}
  }
  catch {
    return {props: { 
      database: null, 
    }}
  }
}