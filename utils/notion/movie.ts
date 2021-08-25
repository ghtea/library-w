import {PropertyValueMap} from "@notionhq/client/build/src/api-endpoints";
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

import {updateNotionPage} from "./global";



export type MoviePropertyValueMap = PropertyValueMap & {
    
    Director?: RichTextPropertyValue;

    Key?: RichTextPropertyValue;

    Latest?: DatePropertyValue;

    Rating?: SelectPropertyValue;

    "Review KOR"?: RichTextPropertyValue;
    "Review ENG"?: RichTextPropertyValue;
    "Review JPN"?: RichTextPropertyValue;

    RYM?: URLPropertyValue;

    Tags?: MultiSelectPropertyValue;
    Title?: TitlePropertyValue;

    Watched?: NumberPropertyValue;
    Year?: NumberPropertyValue;
}

export type MovieData = Page & {
  properties: MoviePropertyValueMap; // PropertyValueMap
  essence?: MovieEssence
}

export type MovieEssence = {
  director?: string;

  key?: string;

  latest?: number;

  rating?: MovieRating;

  reviewKor?: string;
  reviewEng?: string;
  reviewJpn?: string;

  rym?: string;

  tags?: MovieTag[];
  title?: string;
  
  src?: string;

  watched?: number;
  year?: number;
}

export enum MovieRating {
  THE_BEST = "The Best",
  TOP_10 = "Top 10",
  TOP_50 = "Top 50",
  TOP_100 = "Top 100",
  TOP_200 = "Top 200",
  TOP_500 = "Top 500",
}

export const getMovieRatingOrder = (rating: string) => {
  if (rating === MovieRating.THE_BEST ) return 100;
  else if (rating === MovieRating.TOP_10 ) return 99;
  else if (rating === MovieRating.TOP_50 ) return 98;
  else if (rating === MovieRating.TOP_100 ) return 97;
  else if (rating === MovieRating.TOP_200 ) return 96;
  else if (rating === MovieRating.TOP_500 ) return 95;
  else return 0;
}

export enum MovieTag {
  BLOCKED_POSTER = "blocked-poster",
}

export const updateNotionMoviePage = (pageId:string, properties: MoviePropertyValueMap) => updateNotionPage(pageId, properties)