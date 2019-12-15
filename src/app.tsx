import { ApolloProvider } from "@apollo/react-hooks";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ApolloClient from "apollo-boost";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./app.css";
import muiTheme from "./config/muiTheme";
import Router from './views/router';

const uri = "https://d6ykq6a5hva4z.cloudfront.net/graphql";
const client = new ApolloClient({ uri });
const theme = createMuiTheme(muiTheme);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Router />
        </MuiThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
