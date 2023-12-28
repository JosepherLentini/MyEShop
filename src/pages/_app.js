import "@/styles/globals.css";
//context
import { UserContext, initialUserState } from "@/global state/products-state";
//reducer
import { userReducer } from "@/global state/reducers";
import { useReducer } from "react";

import DefaultLayout from "@/layouts/defaultLayout";

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </UserContext.Provider>
  );
}
