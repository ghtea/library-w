import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {useQuery} from "react-query"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {AxiosResponse} from "axios"
import {Box, Flex, Spinner,SpinnerSize} from "components/atoms"
import {Grid} from "components/molecules/Grid"
import {MovieCard} from "components/organisms/movie/MovieCard"
import {FilterValue, FilterValueItem} from "components/organisms/others/FilterInput"
import {TemplateA1} from "components/templates/TemplateA1"
import Fuse from "fuse.js"
import Head from "next/head"
import {useInput,useIntersectionObserver} from "utils/dom"
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
  const [showingMovieDataList, setShowingMovieDataList] = useState<MovieData[]>([])
  const [filterValue, setFilterValue] = useState<MovieFilterValue>(DEFAULT_FILTER_VALUE);
  const [nextCursor, setNextCursor] = useState<string>()
  const [enabled, setEnabled] = useState(true)
   
  const {ref: moreTriggerRef, onceVisible: moreTriggerOnceVisible} = useIntersectionObserver({rootMargin: "0px 0px 500px 0px"})

  const updateMovieDataList = useCallback((response: AxiosResponse<DatabasesQueryResponse>)=>{ 
    const existingMovieDataList = (response?.data?.results || []).filter((item: MovieData) => {
      const title = item.properties.Title?.title[0]?.plain_text;
      return title ? true : false
    })

    const refinedMovieDataList: MovieData[] = (existingMovieDataList || []).map(refineMovieData)

    setMovieDataList(prev => [...prev, ...refinedMovieDataList])
  },[])

  useEffect(()=>{
    const fuse = new Fuse(movieDataList, FUSE_OPTIONS) 

    const searchedMovieDataList = !actualSearchValue 
      ? movieDataList
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

    setShowingMovieDataList(sortedMovieDataList)
  }, [actualSearchValue, filterValue, movieDataList]);

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

  const movieQuery = useQuery(
    ["movies", nextCursor], 
    ()=>getNotionDatabase({
      database: "movie",
      startCursor: nextCursor,
      sorts:  [
        {
          property: "Rating",
          direction: "descending",
        },
      ],
    }),
    {keepPreviousData : true, enabled,}
  );

  // after query
  useEffect(()=>{
    if (movieQuery.status === "success" && movieQuery.data){
      updateMovieDataList(movieQuery.data)
      if (movieQuery.data.data.has_more && movieQuery.data.data.next_cursor){
        setNextCursor(movieQuery.data.data.next_cursor)
      }
    }
  },[movieQuery.status, movieQuery.data, updateMovieDataList])

  useEffect(()=>{
    if (moreTriggerOnceVisible){
      if (movieQuery.data?.data.has_more && !movieQuery.isLoading){
        setEnabled(true)
      } 
    } else {
      setEnabled(false)
    }
  },[movieQuery.data?.data.has_more, movieQuery.isLoading, moreTriggerOnceVisible])

  const initialLoading = useMemo(()=>{
    return movieQuery.isLoading
  },[movieQuery.isLoading])

  const moreLoading = useMemo(()=>{
    return (movieQuery.isFetching && !initialLoading)
  },[initialLoading, movieQuery.isFetching])
  
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

      <Flex
        sx={{
          alignItems: "center",
          p: 3,
        }}
        ref={moreTriggerRef}
      >
        <Grid itemXlWidth={CARD_XL_WIDTH}>
          {showingMovieDataList?.map((item, index)=>(
            <Box
              key={`album-${item?.essence?.title || index}`} 
              ref={index === showingMovieDataList.length - 1 ? moreTriggerRef : null}
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
        {moreLoading && (
          <Flex sx={{py: 5}}>
            <Spinner size={SpinnerSize.LG}/>
          </Flex>
        )}
      </Flex>
    </TemplateA1>
  )
}