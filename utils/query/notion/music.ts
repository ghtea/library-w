import {InputPropertyValueMap, PagesRetrieveResponse, PropertyValueMap} from "@notionhq/client/build/src/api-endpoints";
import { 
  CheckboxPropertyValue,
  CreatedByPropertyValue,
  CreatedTimePropertyValue,
  DatePropertyValue,
  EmailPropertyValue,
  FilesPropertyValue,
  FormulaPropertyValue,
  LastEditedByPropertyValue,
  LastEditedTimePropertyValue,
  MultiSelectPropertyValue,
  NumberFormulaValue,   
  NumberPropertyValue,
  Page,  
  PeoplePropertyValue,
  PhoneNumberPropertyValue,
  RichTextPropertyValue,
  RollupPropertyValue,
  SelectPropertyValue,
  TitlePropertyValue,
  URLPropertyValue} from "@notionhq/client/build/src/api-types";
import {property} from "lodash";

import {createNotionPage,CreateNotionPageConfig,updateNotionPage} from "./shared";



export type MusicPage = Omit<PagesRetrieveResponse, "properties"> & {
  properties: MusicAlbumPropertyValueMap;
} 

export type MusicAlbumData = MusicPage & {
  properties: MusicAlbumPropertyValueMap; // PropertyValueMap
  essence?: MusicAlbumEssence
}

export type MusicAlbumPropertyValueMap = PropertyValueMap & {
    
    Artist?: MultiSelectPropertyValue;

    Key?: RichTextPropertyValue;

    Performer?: RichTextPropertyValue;

    RYM?: URLPropertyValue;
    Released?: DatePropertyValue;
    
    Rating?: SelectPropertyValue;

    "Review KOR"?: RichTextPropertyValue;
    "Review ENG"?: RichTextPropertyValue;
    "Review JPN"?: RichTextPropertyValue;

    Tags?: MultiSelectPropertyValue;
    Title?: TitlePropertyValue;
}

export type MusicAlbumEssence = {
  artistList?: string[];

  key?: string;

  rym?: string;

  rating?: MusicAlbumRating;

  released?: number;

  reviewKor?: string;
  reviewEng?: string;
  reviewJpn?: string;

  tags?: MusicAlbumTag[];
  title?: string;
  
  src?: string;
  performer?: string;
}

export enum MusicAlbumRating {
  THE_BEST = "The Best",
  TOP_10 = "Top 10",
  TOP_50 = "Top 50",
  TOP_100 = "Top 100",
  TOP_200 = "Top 200",
  TOP_500 = "Top 500",
}

export const getMusicAlbumRatingOrder = (rating: string) => {
  if (rating === MusicAlbumRating.THE_BEST ) return 100;
  else if (rating === MusicAlbumRating.TOP_10 ) return 99;
  else if (rating === MusicAlbumRating.TOP_50 ) return 98;
  else if (rating === MusicAlbumRating.TOP_100 ) return 97;
  else if (rating === MusicAlbumRating.TOP_200 ) return 96;
  else if (rating === MusicAlbumRating.TOP_500 ) return 95;
  else return 0;
}

export enum MusicAlbumTag {
  BLOCKED_COVER = "blocked-cover",
  CLASSICAL = "classical",
}

export enum MusicAlbumReviewLanguage {
  ENG = "eng",
  KOR = "kor",
  JPN = "jpn",
}

export const returnReviewDict = (data: MusicAlbumData) => {
  return ({
    [MusicAlbumReviewLanguage.KOR]: data.essence?.reviewKor,
    [MusicAlbumReviewLanguage.ENG]: data.essence?.reviewEng,
    [MusicAlbumReviewLanguage.JPN]: data.essence?.reviewJpn,
  })
}