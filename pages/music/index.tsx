import {ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react"
import {useQuery} from "react-query"

import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints"
import {AxiosResponse} from "axios"
import {Box, Flex} from "components/atoms"
import {Grid} from "components/molecules/Grid"
import {MusicAlbumCard} from "components/organisms/music/MusicAlbumCard"
import {FilterValue, FilterValueItem} from "components/organisms/others/FilterInput"
import {SearchInput} from "components/organisms/others/SearchInput"
import {TemplateA1} from "components/templates/TemplateA1"
import Fuse from "fuse.js"
import Head from "next/head"
import {useInput} from "utils/dom"
import {useDebouncedEffect} from "utils/optimization"
import {getMusicAlbumRatingOrder, MusicAlbumData, MusicAlbumRating, MusicAlbumTag,notion, notionFileUrlPrefix} from "utils/query"
import {getNotionDatabase} from "utils/query/notion/shared"


export type MusicProps = {
}

const getSrc = (key: string | undefined, notionFileUrlPrefix: string, tags: MusicAlbumTag[]) => {
  if (tags?.includes(MusicAlbumTag.BLOCKED_COVER)){
    return `${notionFileUrlPrefix}/music-album-covers/blocked.jpg` 
  }
  else {
    return key ? `${notionFileUrlPrefix}/music-album-covers/${key}.jpg` : undefined
  }
}

export const refineAlbumData = (item: MusicAlbumData) => {

  const artistList = (item.properties.Artist?.multi_select || []).map(item=>item.name) as string[]; 

  const rating = item.properties.Rating?.select.name as MusicAlbumRating;

  const releasedString = item.properties.Released?.date.start; // "1990-7-10"
  const released = releasedString ? Date.parse(releasedString) : undefined

  const rym = item.properties.RYM?.url;

  const reviewKor = item.properties["Review KOR"]?.rich_text[0]?.plain_text;
  const reviewEng = item.properties["Review ENG"]?.rich_text[0]?.plain_text;
  const reviewJpn = item.properties["Review JPN"]?.rich_text[0]?.plain_text;

  const tags = (item.properties.Tags?.multi_select || []).map(item=>item.name) as MusicAlbumTag[]; 
  const title = item.properties.Title?.title[0].plain_text;

  const key = item.properties.Key?.rich_text[0]?.plain_text;

  const src = getSrc(key, notionFileUrlPrefix, tags);

  const performer = item.properties.Key?.rich_text[0]?.plain_text;

  return ({
    ...item,
    essence: {
      artistList,
      rating,
      released,
      rym,
      tags,
      title,
      key,
      src,
      performer,
      reviewKor,
      reviewEng,
      reviewJpn,
    }
  })
}

const DEFAULT_FILTER_VALUE = [...Object.values(MusicAlbumRating)]
  .map(item => ({
    value: item,
    selected: true,
  }))

export type MusicAlbumFilterValue = (Omit<FilterValueItem, "value"> & {
  value: MusicAlbumRating
})[]

const FUSE_OPTIONS = {
  keys: [
    {
      name: "essence.title",
      weight: 12,
    },
    {
      name: "essence.artistList",
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
    "essence.tags",
    "essence.performer",
    "essence.reviewKor",
    "essence.reviewEng",
    "essence.reviewJpn",
  ]
}

const CARD_XL_WIDTH = 240

export default function Music({
}:MusicProps) {
  const searchInput = useInput("")
  const {props: searchInputProps, state: searchInputState} = searchInput

  const [actualSearchValue, setActualSearchValue] = useState("");
  const [albumDataList, setAlbumDataList] = useState<MusicAlbumData[]>([])
  const [filterValue, setFilterValue] = useState<MusicAlbumFilterValue>(DEFAULT_FILTER_VALUE);
  const [page, setPage] = useState(0)

  const updateMusicAlbumDataList = useCallback((response?: AxiosResponse<DatabasesQueryResponse>)=>{ 
    const existingAlbumDataList = (response?.data?.results || []).filter((item: MusicAlbumData) => {
      const title = item.properties.Title?.title[0]?.plain_text;
      return title ? true : false
    })

    const refinedAlbumDataList: MusicAlbumData[] = (existingAlbumDataList || []).map(refineAlbumData)

    const fuse = new Fuse(refinedAlbumDataList, FUSE_OPTIONS) 

    const searchedAlbumDataList = !actualSearchValue 
      ? refinedAlbumDataList
      : fuse.search(actualSearchValue).map(item => item.item)

    const filterSelectedValues = filterValue.filter(item =>item.selected).map(item=>item.value)
    const filteredMovieDataList = searchedAlbumDataList.filter(item => {
      return item.essence?.rating && filterSelectedValues.includes(item.essence?.rating)
    })
    
    const sortedAlbumDataList = filteredMovieDataList.sort((a, b)=>{
      if (a.essence?.rating && b.essence?.rating){
        return (getMusicAlbumRatingOrder(b.essence.rating) - getMusicAlbumRatingOrder(a.essence.rating))
      }
      else { 
        return 0 
      }
    });

    setAlbumDataList(sortedAlbumDataList)
  }, [actualSearchValue, filterValue]);
  
  useDebouncedEffect(()=>{
    setActualSearchValue(searchInputProps.value)
  }, [searchInputProps.value], 500)

  const onChangeFilter = useCallback((newValue: FilterValue)=>{
    setFilterValue(newValue)
  },[])

  const filterText = useCallback((item: MusicAlbumFilterValue[number]) => {
    if (item.value === MusicAlbumRating.THE_BEST){
      return "The Best"
    }
    else if (item.value === MusicAlbumRating.TOP_10){
      return "TOP 10"
    }
    else if (item.value === MusicAlbumRating.TOP_50){
      return "TOP 50"
    }
    else if (item.value === MusicAlbumRating.TOP_100){
      return "TOP 100"
    }
    else if (item.value === MusicAlbumRating.TOP_200){
      return "TOP 200"
    }
    else if (item.value === MusicAlbumRating.TOP_500){
      return "TOP 500"
    }
    else {
      return ""
    }
  },[])

  const musicAlbumQuery = useQuery(["musicAlbums",page], ()=>getNotionDatabase({
    database: "music-album",
    startCursor: page,
    sorts:  [
      {
        property: "Rating",
        direction: "descending",
      },
    ],
  }));

  useEffect(()=>{
    if (musicAlbumQuery.status === "success" && musicAlbumQuery.data){
      updateMusicAlbumDataList(musicAlbumQuery.data)
    }
  },[musicAlbumQuery.data, musicAlbumQuery.status, updateMusicAlbumDataList])

  const initialLoading = useMemo(()=>{
    return (page === 0) && musicAlbumQuery.isLoading 
  },[musicAlbumQuery, page])

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
        <title>Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        sx={{
          alignItems: "center",
          p: 3,
        }}
      >
        <Grid itemXlWidth={CARD_XL_WIDTH}>
          {albumDataList?.map((item, index)=>(
            <Box
              key={`album-${item?.essence?.title || index}`} 
              sx={{
                lineHeight: 0, 
                p: 4,
                width: ["calc(100% / 2)", "calc(100% / 3)", "calc(100% / 5)", "240px"],
              }}
            >
              <MusicAlbumCard
                data={item}
              />
            </Box>
          ))}
        </Grid>
      </Flex>
    </TemplateA1>
  )
}