// TODO: WIP
import React, {ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState} from "react"

import {Paragraph, Textarea, TextareaProps} from "components/atoms";

export type EditableParagraphProps = TextareaProps & {
  
};

export const useTextarea: React.FunctionComponent<EditableParagraphProps> =  ({
  defaultValue,
  ...rest
}) => {

  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(defaultValue)

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event: ChangeEvent<HTMLTextAreaElement>)=>{
    setValue(event.target.value)
  },[])
  
  return (<>{
    isEditing 
      ? <Textarea defaultValue={defaultValue} value={value} onChange={onChange}/>
      : <Paragraph/>
  }</>);
}