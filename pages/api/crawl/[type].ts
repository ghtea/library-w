import Crawler from "crawler"
import {NextApiRequest, NextApiResponse} from "next";
import {notion} from "utils/query";
// https://www.npmjs.com/package/crawler#working-with-cheerio
// https://www.npmjs.com/package/cheerio

const callbackRymMusicAlbum: Callback = (error, res, done) => {
  if(error) {
    console.log(error)
  } else {
    const $ = res.$;
    const title = $("title").text()
    console.log("title: ", title); // TODO: remove
    console.log("crawled: ", $); // TODO: remove
  }
  done();
}

const callbackRymMovie: Callback = (error, res, done) => {
  if(error) {
    console.log(error)
  } else {
    const $ = res.$;
    const title = $("title").text()
    console.log("title: ", title); // TODO: remove
    console.log("crawled: ", $); // TODO: remove
  }
  done();
}

type Callback = ((err: Error, res: Crawler.CrawlerRequestResponse, done: () => void) => void) | undefined

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const crawler = new Crawler({})

    const type = req.query.type
    const link = req.body.link;

    const callback = (
      type === CrawlType.RYM_MUSIC_ALBUM ? callbackRymMusicAlbum :
        type === CrawlType.RYM_MOVIE ? callbackRymMovie :
          undefined
    )

    if (!type || !link || !callback) throw Error

    crawler.queue([{
      uri: link,
      callback,
    }]);

    res.status(200)
  }
  catch(error) {
    console.log(error);
    res.status(400)
  }
}

export enum CrawlType {
  RYM_MUSIC_ALBUM = "rym-music-album",
  RYM_MOVIE = "rym-movie"
}