import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import SignUp from "./components/pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  </ChakraProvider>
);
