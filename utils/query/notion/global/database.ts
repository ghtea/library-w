import axios from "axios";

// database
// https://developers.notion.com/reference/post-database-query
export const getNotionDatabase = async (config: GetNotionDatabaseConfig) =>{
  try {
    const {databaseId, filter, sorts, startCursor, pageSize} = config

    const response = await axios.patch("/api/notion/pages/update", {
      database_id: databaseId,
      filter: filter,
      sorts: sorts,
      start_cursor: startCursor,
      page_size: pageSize,
    });

    return response;
  }
  catch(error) {
    console.log(error)
    return null;
  }
}

export type GetNotionDatabaseConfig = {
  databaseId: string;
  filter?: Filter,
  sorts: Sorts,
  startCursor: number,
  pageSize: number,
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