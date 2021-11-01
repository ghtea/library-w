import {Client} from "@notionhq/client"

export * from "./movie"
export * from "./music"
export * from "./shared"

export const notion = new Client({auth: process.env.NEXT_PUBLIC_NOTION_KEY})

export const notionFileUrlPrefix = process.env.NEXT_PUBLIC_NOTION_FILE_URL_PREFIX || "";
