import React, { Fragment } from "react";

import { ResponsiveRange,useResponsive } from "tools/responsive";

export type ResponsiveProps = {
    range: ResponsiveRange
};

export const Responsive: React.FunctionComponent<ResponsiveProps> = ({
  range,
  children
}) => {

  const responsive = useResponsive();

  const shouldShow = responsive[range];

  return shouldShow ? <Fragment>{children}</Fragment> : null;
};
