import {ChangeEventHandler, useCallback, useState} from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value);
    },[]
  );

  return {
    value,
    onChange: onChange
  };
};