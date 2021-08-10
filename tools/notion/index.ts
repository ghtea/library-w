import { Client } from "@notionhq/client"

export const notion = new Client({ auth: process.env.NOTION_KEY })

export const notionFileUrlPrefix = process.env.NEXT_PUBLIC_NOTION_FILE_URL_PREFIX || "";