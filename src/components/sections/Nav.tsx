import { Avatar, Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiShoppingCart } from "react-icons/fi";

const Nav = () => {
  const fbAuth = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await fbAuth?.logoutFn();
      history.push("/login");
    } catch {
      throw new Error();
    }
  };

  return (
    <Flex align="center" p="2" m="2" justify="center" bg="teal.400">
      <Box p="2">
        <Link to="/">
          <IconButton bg="gray.200" color="pink.400" size="lg" aria-label="Item type icon" icon={<FiShoppingCart />} />
        </Link>
      </Box>
      <Spacer />
      <Flex align="center" justify="flex-end">
        {!fbAuth?.loggedInUser ? (
          <>
            <Link to="/login">
              <Button m="2" variant="solid" colorScheme="pink">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button m="2" variant="solid" colorScheme="pink">
                Sign up
              </Button>
            </Link>
          </>
        ) : (
          <Button m="2" variant="solid" colorScheme="pink" onClick={() => handleLogout()}>
            Logout
          </Button>
        )}
        <Avatar m="2" name={(fbAuth?.loggedInUser && fbAuth.loggedInUser.displayName) ?? "Not suppled"} bg="gray.200" />
      </Flex>
    </Flex>
  );
};

export default Nav;
