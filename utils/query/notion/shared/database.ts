import {DatabasesQueryResponse} from "@notionhq/client/build/src/api-endpoints";
import axios, {AxiosResponse} from "axios";

import {Database} from "./shared";

// database
// https://developers.notion.com/reference/post-database-query
export const getNotionDatabase = async (config: GetNotionDatabaseConfig) =>{
  try {
    const {database, databaseId, filter, sorts, startCursor, pageSize} = config

    const computedDatabaseId = databaseId 
      ? databaseId  : 
      database === "movie" ? process.env.NEXT_PUBLIC_NOTION_MOVIE_DB_ID : 
        database === "music-album" ? process.env.NEXT_PUBLIC_NOTION_MUSIC_DB_ID : 
          ""

    const response: AxiosResponse<DatabasesQueryResponse> = await axios.post("/api/notion/databases/query", {
      database_id: computedDatabaseId,
      filter: filter,
      sorts: sorts,
      start_cursor: startCursor ? startCursor.toString() : undefined,
      page_size: pageSize,
    });

    console.log("response ssssss: ", response); // TODO: remove
    return response;
  }
  catch(error) {
    console.log(error)
    return null;
  }
}

export type GetNotionDatabaseConfig = {
  database?: Database
  databaseId?: string;
  filter?: Filter,
  sorts?: Sorts,
  startCursor?: number,
  pageSize?: number,
}

type Filter = (
  FilterItem | 
  { or: FilterItem[] } |
  { and: FilterItem[] }
)

type Sorts = SortItem[]

type FilterItem = {
  property: string
} & any

type SortItem = (
  {
    property: string
    direction: "ascending" | "descending"
  } | {
    timestamp: string
    direction: "ascending" | "descending"
  }
)