import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthorizationContext = {
  
};

const initialAuthorizationContext = {
  session: null,
  user: null,
  loading: false,
};

export const AuthorizationContext = createContext<AuthorizationContext>(initialAuthorizationContext);

export const useAuthorization = () => {
  return useContext(AuthorizationContext);
};

export const AuthorizationProvider: FunctionComponent = (props) => {
  const [value, setValue] = useState<AuthorizationContext>(initialAuthorizationContext);

  useEffect(() => {
    
  }, []);

  return (
    <AuthorizationContext.Provider value={value}>
      {props.children}
    </AuthorizationContext.Provider>
  );
};
