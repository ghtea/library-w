import axios from "axios";

export const updateNotionPage = async (config: UpdateNotionPageConfig) =>{
  try {
    const {pageId, properties, archived, icon, cover} = config

    const response = await axios.patch("/api/notion/pages/update", {
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

type UpdateNotionPageConfig = {
  pageId: string
  properties?: any
  archived?: boolean
  icon?: any
  cover?: any
}



export const createNotionPage = async (config: CreateNotionPageConfig) =>{
  try {
    const {parent, properties, children, icon, cover} = config

    const response = await axios.patch("/api/notion/pages/create", {
      parent: parent,
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

type CreateNotionPageConfig = {
  parent: Parent
  properties?: any
  children?: any[]
  icon?: any
  cover?: any
}

type Parent = (
  {type: "database_id", database_id: string} |
  {type: "page_id", page_id: string}
)
