import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {useQuery} from "react-query"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {AxiosResponse} from "axios"
import {Box, Flex} from "components/atoms"
import {Grid} from "components/molecules/Grid"
import {MovieCard} from "components/organisms/movie/MovieCard"
import {FilterValue, FilterValueItem} from "components/organisms/others/FilterInput"
import {TemplateA1} from "components/templates/TemplateA1"
import Fuse from "fuse.js"
import Head from "next/head"
import {useInput} from "utils/dom"
import {useDebouncedEffect} from "utils/optimization"
import {getMovieRatingOrder, MovieData, MovieRating, MovieTag,MovieType,notion, notionFileUrlPrefix} from "utils/query"
import {getNotionDatabase} from "utils/query/notion/shared"

export type MovieProps = {
  
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

const CARD_XL_WIDTH = 240

export default function Movie({
  
}:MovieProps) {
  const searchInput = useInput("")
  const {props: searchInputProps, state: searchInputState} = searchInput

  const [actualSearchValue, setActualSearchValue] = useState("");
  const [movieDataList, setMovieDataList] = useState<MovieData[]>([])
  const [filterValue, setFilterValue] = useState<MovieFilterValue>(DEFAULT_FILTER_VALUE);
  const [page, setPage] = useState(0)

  const updateMovieDataList = useCallback((response?: AxiosResponse<DatabasesQueryResponse>)=>{ 
    const existingMovieDataList = (response?.data?.results || []).filter((item: MovieData) => {
      const title = item.properties.Title?.title[0]?.plain_text;
      return title ? true : false
    })

    const refinedMovieDataList: MovieData[] = (existingMovieDataList || []).map(refineMovieData)

    const fuse = new Fuse(refinedMovieDataList, FUSE_OPTIONS) 

    const searchedMovieDataList = !actualSearchValue 
      ? refinedMovieDataList
      : fuse.search(actualSearchValue).map(item => item.item)

    const filterSelectedValues = filterValue.filter(item =>item.selected).map(item=>item.value)
    const filteredMovieDataList = searchedMovieDataList.filter(item => {
      return item.essence?.type && filterSelectedValues.includes(item.essence?.type)
    })

    const sortedMovieDataList = filteredMovieDataList.sort((a, b)=>{
      if (a.essence?.rating && b.essence?.rating){
        return (getMovieRatingOrder(b.essence.rating) - getMovieRatingOrder(a.essence.rating))
      }
      else { 
        return 0 
      }
    });

    setMovieDataList(sortedMovieDataList)
  }, [actualSearchValue, filterValue]);

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

  const moviesQuery = useQuery(["movies",page], ()=>getNotionDatabase({
    database: "movie",
    startCursor: page,
    sorts:  [
      {
        property: "Rating",
        direction: "descending",
      },
    ],
  }));

  useEffect(()=>{
    if (moviesQuery.status === "success" && moviesQuery.data){
      updateMovieDataList(moviesQuery.data)
    }
  },[moviesQuery.status, moviesQuery.data, updateMovieDataList])

  const initialLoading = useMemo(()=>{
    return (page === 0) && moviesQuery.isLoading 
  },[moviesQuery, page])

  return (
    <TemplateA1
      loading={initialLoading}
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
        sx={{
          alignItems: "center",
          p: 3,
        }}
      >
        <Grid itemXlWidth={CARD_XL_WIDTH}>
          {movieDataList?.map((item, index)=>(
            <Box
              key={`album-${item?.essence?.title || index}`} 
              sx={{
                lineHeight: 0, 
                p: 4,
                width: ["calc(100% / 2)", "calc(100% / 3)", "calc(100% / 5)", `${CARD_XL_WIDTH}px`],
              }}
            >
              <MovieCard
                data={item}
              />
            </Box>
          ))}
        </Grid>
      </Flex>
    </TemplateA1>
  )
}