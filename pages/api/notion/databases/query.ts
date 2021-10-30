import {NextApiRequest, NextApiResponse} from "next";
import {notion} from "utils/query";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await notion.databases.query(req.body)
    res.status(200).json(response)
  }
  catch(error) {
    console.log(error);
    res.status(400)
  }
}