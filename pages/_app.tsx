import "../styles/globals.css";
import type { AppProps } from "next/app";

import LumiaSnackbar from "../components/app/LumiaSnackbar";
import auth from "../components/config/initAuth";
import store from "../redux/store";
import { Provider } from "react-redux";
import AuthProvider from "../components/auth/AuthProvider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { GRAPHQL_API_URL } from "../components/config/urls";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache(),
  });
  return (
    <AuthProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <LumiaSnackbar />
        </ApolloProvider>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
