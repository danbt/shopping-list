import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingLayout from "./components/layouts/LandingLayout";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <LandingLayout />
        </Route>
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);
