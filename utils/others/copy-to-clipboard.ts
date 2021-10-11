import { useState } from "react"
import copy from "copy-to-clipboard"

export const useCopyToClipboard = () => {
  const [value, setValue] = useState<string>()
  const [success, setSuccess] = useState<any>()

  const copyToClipboard = (text: string, options: any) => {
    const result = copy(text, options)

    if (result) setValue(text)
    setSuccess(result)
  }

  return [copyToClipboard, { value, success }]
}