// TODO: WIP
import React, {ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState} from "react"

import {Paragraph, Textarea, TextareaProps} from "components/atoms";

export type EditableParagraphProps = TextareaProps & {
  
};

export const useInput =  (defaultValue: unknown) => {

  const [value, setValue] = useState(defaultValue)

  const onChange: ChangeEventHandler = useCallback((event: ChangeEvent)=>{
    //setValue(event.target.value)
  },[])
  
}