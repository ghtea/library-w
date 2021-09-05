import {NextApiRequest, NextApiResponse} from "next";
import {notion} from "utils/notion";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return notion.databases.query(req.body)
}