import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

import {Session} from "next-auth";
import {useSession} from "next-auth/client";


export type AuthContext = {
  session: null | Pick<Session, "expires">
  user: null | Session["user"] & {
    role: "admin" | "guest"
  }
  loading: boolean;
};

const initialAuthContext = {
  session: null,
  user: null,
  loading: false,
};

export const AuthContext = createContext<AuthContext>(initialAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FunctionComponent = (props) => {
  const [value, setValue] = useState<AuthContext>(initialAuthContext);

  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading){
      console.log("raw session: ", session)

      if (session){
        const newValue: AuthContext = {
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
        setValue(initialAuthContext)
      }
    }
    else {
      setValue(previousValue => ({...previousValue, loading: true}))
    }
  }, [session, loading]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};
