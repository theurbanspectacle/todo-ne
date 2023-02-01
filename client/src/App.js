import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Column, Grid } from "@carbon/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Headers";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Grid className="wrapping-grid">
          <Column lg={16} md={8} sm={4} max={16} xlg={16}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
            </Routes>
          </Column>
        </Grid>
      </Router>
    </ApolloProvider>
  );
}

export default App;
