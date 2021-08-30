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
  user: null | Session["user"] & {
    role: "admin" | "guest"
  }
  loading: boolean;
};

const initialAuthenticationContext = {
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
      console.log("raw session: ", session)

      if (session){
        const newValue: AuthenticationContext = {
          session: {
            expires: session.expires
          },
          user: {
            ...session.user,
            role: "guest"
          },
          loading: loading,
        };

        if (newValue.user && newValue.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL){
          newValue.user.role = "admin"
        }

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
