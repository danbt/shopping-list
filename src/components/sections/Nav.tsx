import { Avatar, Box, Button, Center, Container, Flex, IconButton, Spacer } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiShoppingCart } from "react-icons/fi";
import { useAppState } from "../../contexts/AppStateContext";

const Nav = () => {
  const fbAuth = useAuth();
  const history = useHistory();
  const appState = useAppState();

  const handleLogout = async () => {
    try {
      await fbAuth?.logoutFn();
      history.push("/login");
    } catch {
      throw new Error();
    }
  };

  useEffect(() => {
    console.log(appState?.getAvatarSrc());
  }, []);

  return (
    <Center>
      <Container maxW="3xl" mx="0" px="0">
        <Flex align="center" p="1" m="1" mb="0" justify="center" bg="brandGreen.500" roundedTop="xl">
          <Box p="2">
            <Link to="/">
              <IconButton
                bg="brandGreen.900"
                color="brandOrange.500"
                size="lg"
                aria-label="Item type icon"
                icon={<FiShoppingCart />}
                rounded="xl"
              />
            </Link>
          </Box>
          <Spacer />
          <Flex align="center" justify="flex-end">
            {!fbAuth?.loggedInUser ? (
              <>
                <Link to="/login">
                  <Button m="2" variant="outline" colorScheme="brandOrange">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button m="2" variant="solid" colorScheme="brand">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <Button m="2" variant="solid" colorScheme="brandOrange" onClick={() => handleLogout()}>
                Logout
              </Button>
            )}
            <Link to="/profile">
              <Avatar
                m="2"
                bg="gray.200"
                name="Not supplied"
                src={`https://avatars.dicebear.com/api/avataaars/:${appState?.getAvatarSrc()}.svg`}
              />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
};

export default Nav;
