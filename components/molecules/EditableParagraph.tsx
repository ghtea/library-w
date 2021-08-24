// TODO: WIP
import React, {useMemo, useState} from "react"

import {Paragraph, Textarea} from "components/atoms";

export type EditableParagraphProps = {
  
};

export const EditableParagraph: React.FunctionComponent<EditableParagraphProps> =  ({
  ...rest
}) => {

  const [isEditing, setIsEditing] = useState(false);

  
  return (<>{
    isEditing 
      ? <Textarea/>
      : <Paragraph/>
  }</>);
}