import {useCallback, useState} from "react"

import {InputProps} from "components/atoms";

type Return = {
  props: Pick<InputProps, "onChange" | "onFocus" | "onBlur"> & {
    value: string
  },
  state: {
    focused: boolean
  }
}

export const useInput = (initialValue: string): Return => {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false)

  const onChange: InputProps["onChange"] = useCallback((event)=>{
    setValue(event.currentTarget.value)
  },[])

  const onFocus: InputProps["onFocus"] = useCallback((event)=>{
    setFocused(true)
  },[])

  const onBlur: InputProps["onBlur"] = useCallback((event)=>{
    setFocused(false)
  },[])

  return ({
    props: {
      value, 
      onChange, 
      onFocus, 
      onBlur
    }, 
    state: {
      focused
    }
  });
};