import {PagesUpdateParameters} from "@notionhq/client/build/src/api-endpoints";
import {NextApiRequest, NextApiResponse} from "next";
import {notion} from "utils/notion";



// TODO: try https://dongmin-jang.medium.com/react-lets-solve-cors-in-nextjs-c3dae0b6dd79
// https://www.youtube.com/watch?v=zVfVLBjQuSA

export const updateNotionPageApi = (args: PagesUpdateParameters) => notion.pages.update(args);



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return notion.pages.update(req.body)
}