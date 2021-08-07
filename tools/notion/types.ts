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
  NumberPropertyValue,
  PeoplePropertyValue,
  PhoneNumberPropertyValue,
  RichTextPropertyValue,
  RollupPropertyValue,
  SelectPropertyValue,
  TitlePropertyValue,
  URLPropertyValue,
} from "@notionhq/client/build/src/api-types";


export type MusicAlbumPropertyValueMap = PropertyValueMap & {
    Name?: TitlePropertyValue;
    Artist?: RichTextPropertyValue;
    Key?: RichTextPropertyValue;
    RYM?: URLPropertyValue;
    Year?: NumberPropertyValue;
    // rating
    Often?: SelectPropertyValue;
    Fullness?: SelectPropertyValue;
    Unity?: SelectPropertyValue;
    Dee?: SelectPropertyValue;
    //
    Score?: FormulaPropertyValue;
}