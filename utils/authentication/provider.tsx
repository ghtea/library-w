import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

import {Session} from "next-auth";
import {useSession} from "next-auth/client";


export type AuthenticationContext = {
  session: null | Pick<Session, "expires">
  user: null | Session["user"]
  loading: boolean;
};

const initialAuthenticationContext: AuthenticationContext = {
  session: null,
  user: null,
  loading: false,
};

export const AuthenticationContext = createContext<AuthenticationContext>(initialAuthenticationContext);

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider: FunctionComponent = (props) => {
  const [value, setValue] = useState<AuthenticationContext>(initialAuthenticationContext);

  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading){
      // console.log("raw session: ", session)

      if (session){
        const newValue: AuthenticationContext = {
          session: {
            expires: session.expires
          },
          user: {
            ...session.user,
          },
          loading: loading,
        };

        setValue(newValue);
      }
      else {
        setValue(initialAuthenticationContext)
      }
    }
    else {
      setValue(previousValue => ({...previousValue, loading: true}))
    }
  }, [session, loading]);

  return (
    <AuthenticationContext.Provider value={value}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
