import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";
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
  URLPropertyValue } from "@notionhq/client/build/src/api-types";



export type MusicAlbumPropertyValueMap = PropertyValueMap & {
    
    Artist?: RichTextPropertyValue;

    Key?: RichTextPropertyValue;

    Performer?: RichTextPropertyValue;

    RYM?: URLPropertyValue;
    Released?: DatePropertyValue;
    
    Rating?: SelectPropertyValue;

    "Review ENG"?: RichTextPropertyValue;
    "Review KOR"?: RichTextPropertyValue;

    Tags?: MultiSelectPropertyValue;
    Title?: TitlePropertyValue;
}

export type MusicAlbumData = Page & {
  properties: MusicAlbumPropertyValueMap; // PropertyValueMap
  essence?: MusicAlbumEssence
}

export type MusicAlbumEssence = {
  artist?: string;

  key?: string;

  rym?: string;

  rating?: MusicAlbumRating;

  released?: number;
  reviewKor?: string;
  reviewEng?: string;

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

export enum MusicAlbumTag {
  BLOCKED_COVER = "blocked-cover",
  CLASSICAL = "classical",
}