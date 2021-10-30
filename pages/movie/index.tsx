import {useCallback, useEffect, useMemo, useRef, useState} from "react"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {Box, Flex} from "components/atoms"
import {MovieCard} from "components/organisms/movie/MovieCard"
import {FilterValue, FilterValueItem} from "components/organisms/others/FilterInput"
import {TemplateA1} from "components/templates/TemplateA1"
import Fuse from "fuse.js"
import throttle from "lodash/throttle"
import Head from "next/head"
import {useInput} from "utils/dom"
import {useDebouncedEffect} from "utils/optimization"
import {getMovieRatingOrder, MovieData, MovieRating, MovieTag,MovieType,notion, notionFileUrlPrefix} from "utils/query"
import {useResponsive} from "utils/responsive"

export type MovieProps = {
  database: DatabasesQueryResponse | null;
}

const getSrc = (key: string | undefined, notionFileUrlPrefix: string, tags: MovieTag[]) => {
  return key ? `${notionFileUrlPrefix}/movie-posters/${key}.jpg` : undefined
}

export const refineMovieData = (item: MovieData) => {
  const type = item.properties.Type?.select.name as MovieType;

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
      type,
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

const FUSE_OPTIONS = {
  keys: [
    {
      name: "essence.title",
      weight: 12,
    },
    {
      name: "essence.director",
      weight: 8,
    },
    {
      name: "essence.rating",
      weight: 4,
    },
    {
      name: "essence.released",
      weight: 4,
    },
    "essence.type",
    "essence.tags",
    "essence.reviewKor",
    "essence.reviewEng",
    "essence.reviewJpn",
  ]
}

const DEFAULT_FILTER_VALUE = [...Object.values(MovieType)]
  .map(item => ({
    value: item,
    selected: true,
  }))

export type MovieFilterValue = (Omit<FilterValueItem, "value"> & {
  value: MovieType
})[]

const XL_CARD_WIDTH = 240

export default function Movie({
  database,
}:MovieProps) {
  const searchInput = useInput("")
  const {props: searchInputProps, state: searchInputState} = searchInput

  const [actualSearchValue, setActualSearchValue] = useState("");
  const [movieDataList, setMovieDataList] = useState<MovieData[]>([])
  const [filterValue, setFilterValue] = useState<MovieFilterValue>(DEFAULT_FILTER_VALUE);
  const [collectionXlWidth, setCollectionXlWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const updateMovieDataList = useCallback(()=>{ 
    console.log("database?.results: ", database?.results); // TODO: remove
    const existingMovieDataList = database?.results.filter((item: MovieData) => {
      const title = item.properties.Title?.title[0]?.plain_text;
      return title ? true : false
    })

    const refinedMovieDataList: MovieData[] = (existingMovieDataList || []).map(refineMovieData)

    const fuse = new Fuse(refinedMovieDataList, FUSE_OPTIONS) 

    const searchedMovieDataList = !actualSearchValue 
      ? refinedMovieDataList
      : fuse.search(actualSearchValue).map(item => item.item)

    console.log("searchedMovieDataList: ", searchedMovieDataList); // TODO: remove

    const filterSelectedValues = filterValue.filter(item =>item.selected).map(item=>item.value)
    const filteredMovieDataList = searchedMovieDataList.filter(item => {
      return item.essence?.type && filterSelectedValues.includes(item.essence?.type)
    })

    console.log("filteredMovieDataList: ", filteredMovieDataList); // TODO: remove

    const sortedMovieDataList = filteredMovieDataList.sort((a, b)=>{
      if (a.essence?.rating && b.essence?.rating){
        return (getMovieRatingOrder(b.essence.rating) - getMovieRatingOrder(a.essence.rating))
      }
      else { 
        return 0 
      }
    });

    setMovieDataList(sortedMovieDataList)
  }, [database?.results, actualSearchValue, filterValue]);

  useEffect(()=>{
    updateMovieDataList()
  }, [updateMovieDataList])

  useDebouncedEffect(()=>{
    setActualSearchValue(searchInputProps.value)
  }, [searchInputProps.value], 500)
  
  const onChangeFilter = useCallback((newValue: FilterValue)=>{
    setFilterValue(newValue)
  },[])

  const filterText = useCallback((item: MovieFilterValue[number]) => {
    if (item.value === MovieType.ANIMATION){
      return "Animation"
    }
    else if (item.value === MovieType.SHOOTING){
      return "Shooting"
    }
    else {
      return ""
    }
  },[])

  const handleResize = useCallback(()=>{
    setCollectionXlWidth(Math.floor((containerRef.current?.offsetWidth || 0) / XL_CARD_WIDTH) * XL_CARD_WIDTH)
  },[])

  useEffect(()=>{
    if (!window) return 
    const throttledResize = throttle(handleResize, 500, {leading: true, trailing: true});

    window.addEventListener("resize", throttledResize)
    return () => {
      window.removeEventListener("resize", throttledResize)
    }
  },[handleResize])

  return (
    <TemplateA1
      searchInputProps={{
        input: searchInput
      }}
      filterInputProps={{
        text: filterText,
        value: filterValue,
        onChange: onChangeFilter,
      }}
    >
      <Head>
        <title>Movie</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO: https://codepen.io/fullstackdigital/pen/MBzKXj use flex to make grid */}
      <Flex
        ref={containerRef}
        sx={{
          alignItems: "center",
          p: 3,
        }}
      >
        <Flex 
          sx={{
            flexDirection: "row", 
            justifyContent: "flex-start", 
            alignItems: "flex-start",
            flexWrap: "wrap", 
            width: ["100%", null, null, `${collectionXlWidth}px`]
          }}>
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
              />
            </Box>
          )
          )}
          <Box sx={{flexGrow: 1, flexShrink: 1}}></Box>
        </Flex>
      </Flex>
    </TemplateA1>
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