import { PropertyValueMap } from "@notionhq/client/build/src/api-endpoints";
import { 
    TitlePropertyValue,
    RichTextPropertyValue,
    NumberPropertyValue,
    SelectPropertyValue,
    MultiSelectPropertyValue,
    DatePropertyValue,
    FormulaPropertyValue,
    RollupPropertyValue,
    PeoplePropertyValue,
    FilesPropertyValue,
    CheckboxPropertyValue,
    URLPropertyValue,
    EmailPropertyValue,
    PhoneNumberPropertyValue,
    CreatedTimePropertyValue,
    CreatedByPropertyValue,
    LastEditedTimePropertyValue,
    LastEditedByPropertyValue,
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
    Score?: FormulaPropertyValue;
}