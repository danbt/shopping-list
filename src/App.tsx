import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import SignUp from "./components/pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import ListDashboard from "./components/pages/ListDashboard";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={ListDashboard} />
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  </ChakraProvider>
);
