import {NextApiRequest, NextApiResponse} from "next";
import {notion} from "utils/query";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return notion.pages.retrieve(req.body)
}