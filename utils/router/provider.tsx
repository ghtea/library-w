import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

import {NextRouter, useRouter as useNextRouter} from "next/router";

export type RouterContext = {
  router?: NextRouter;
  pathSeries: PathSeries
  loading: boolean;
};

type PathSeries = string[];

const RouterContext = createContext<RouterContext>({
  router: undefined,
  pathSeries: [],
  loading: false,
});

export const useAdvancedRouter = () => {
  return useContext(RouterContext);
};

export const RouterProvider: React.FunctionComponent = ({children}) => {
  const router = useNextRouter();

  const [loading, setLoading] = useState(false)

  const pathSeries: PathSeries = useMemo(()=>{
    
    const pathname = router.pathname;
    const newPathSeries: PathSeries = pathname.split(/\//);
    newPathSeries.shift()
    
    return newPathSeries;
  },[router])

  useEffect(() => {
    const handleRouteChangeStart = (url: string, {shallow}: {shallow: boolean}) => {
      setLoading(true)
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
    }
  }, [router])

  useEffect(() => {
    const handleRouteChangeComplete = (url: string, {shallow}: {shallow: boolean}) => {
      setLoading(false)
    }

    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router])

  useEffect(() => {
    const handleRouteChangeError = (url: string, {shallow}: {shallow: boolean}) => {
      setLoading(false)
    }

    router.events.on("routeChangeError", handleRouteChangeError)
    return () => {
      router.events.off("routeChangeError", handleRouteChangeError)
    }
  }, [router])

  const value = useMemo(()=>{
    return ({
      router,
      pathSeries,
      loading,
    })
  },[loading, pathSeries, router])

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};