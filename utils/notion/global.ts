import {Client} from "@notionhq/client"
import {InputPropertyValueMap} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({auth: process.env.NOTION_KEY})

export const notionFileUrlPrefix = process.env.NEXT_PUBLIC_NOTION_FILE_URL_PREFIX || "";

export const updateNotionPage = async (pageId: string, properties: InputPropertyValueMap) =>{

  try {
    const response = await notion.pages.update({
      page_id: pageId,
      properties: properties,
      archived: false,
    });

    return response;
  }
  catch(error) {
    console.log(error)
    return null;
  }

}