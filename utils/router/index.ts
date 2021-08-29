import React, {useMemo} from "react";

import {useRouter} from "next/router";


type PathSeries = string[];
  
export const useAdvancedRouter = () => {
  const basicRouter = useRouter();

  const pathSeries: PathSeries = useMemo(()=>{
    
    const pathname = basicRouter.pathname;
    const newPathSeries: PathSeries = pathname.split(/\//);
    newPathSeries.shift()
    
    return newPathSeries;
  },[basicRouter])

  return {
    router: basicRouter,
    pathSeries: pathSeries,
  };
};