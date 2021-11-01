import axios from "axios";
import {LibraryCategory} from "pages";

import {Database} from "./shared";

export const updateNotionPage = async (config: UpdateNotionPageConfig) =>{
  try {
    const {pageId, properties, archived, icon, cover} = config

    const response = await axios.post("/api/notion/pages/query", {
      page_id: pageId,
      properties: properties,
      archived: archived,
      icon: icon,
      cover: cover,
    });

    return response;
  }
  catch(error) {
    console.log(error)
    return null;
  }
}

export type UpdateNotionPageConfig = {
  pageId: string
  properties?: any
  archived?: boolean
  icon?: any
  cover?: any
}

export const createNotionPage = async (config: CreateNotionPageConfig) =>{
  try {
    const {database, parent, properties, children, icon, cover} = config

    const computedParent = parent ? parent : 
      database === "music-album" ? {type: "database_id", database_id: process.env.NEXT_PUBLIC_NOTION_MUSIC_DB_ID || ""} :
        database === "movie" ? {type: "database_id", database_id: process.env.NEXT_PUBLIC_NOTION_MOVIE_DB_ID || ""} : 
          {}

    const response = await axios.patch("/api/notion/pages/create", {
      parent: computedParent,
      properties: properties,
      children: children,
      icon: icon,
      cover: cover,
    });

    return response;
  }
  catch(error) {
    console.log(error)
    return null;
  }
}

export type CreateNotionPageConfig = {
  database?: Database
  parent?: Parent
  properties?: any
  children?: any[]
  icon?: any
  cover?: any
}

type Parent = (
  {type: "database_id", database_id: string} |
  {type: "page_id", page_id: string}
)