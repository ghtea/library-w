import React, {useCallback, useMemo} from "react";

import {Box as ThemeUiBox, BoxProps as ThemeUiBoxProps, ThemeUIStyleObject} from "theme-ui"
import {useAdvancedRouter} from "tools/router";

export type LocalLinkProps = ThemeUiBoxProps & {
  to: string;
};


export const LocalLink = React.forwardRef<HTMLDivElement, LocalLinkProps>((props, ref) => {

  const {
    sx,
    to,
    ...rest
  } = props;

  const {router} = useAdvancedRouter()

  const onClick = useCallback(()=>{
    router.push(to)
  },[router, to])
  
  const _sx: ThemeUIStyleObject = useMemo(()=>({
    cursor: "pointer",
    ...sx,
  }),[sx])

  return (
    <ThemeUiBox as={"a"} ref={ref} sx={_sx} onClick={onClick} {...rest} />
  );
});

LocalLink.displayName = "LocalLink";