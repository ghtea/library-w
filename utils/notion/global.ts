import {InputPropertyValueMap} from "@notionhq/client/build/src/api-endpoints";
import axios from "axios";

export const updateNotionPage = async (pageId: string, properties: InputPropertyValueMap) =>{

  try {
    const response = await axios.patch("/api/notion/pages/update", {
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