import React, { FC, useState } from "react";
import {
  Center,
  VStack,
  Container,
  Heading,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Profile: FC = () => {
  const [errorText, setErrorText] = useState("");
  const [inEditMode, setInEditMode] = useState(false);
  const fbAuth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      setErrorText("");
      setIsLoading(true);
      await fbAuth?.logoutFn();
      history.push("/login");
    } catch {
      setErrorText("Could not logout user");
    }
    setIsLoading(false);
  };

  if (inEditMode) {
    return (
      <Container width="1200px" alignContent="center" justifyContent="center">
        <Center bg="gray.300" color="white" rounded="lg">
          <VStack width="100%" spacing={4}>
            {errorText && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Oh no!</AlertTitle>
                <AlertDescription>{errorText}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Heading>Profile</Heading>
            <Heading> {fbAuth?.loggedInUser && fbAuth.loggedInUser.email}</Heading>
            <Button onClick={() => setInEditMode(false)}>Cancel</Button>
            <Button onClick={() => console.log("save")}>Save</Button>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Container width="1200px" alignContent="center" justifyContent="center">
      <Center bg="gray.300" color="white" rounded="lg">
        <VStack width="100%" spacing={4}>
          <Heading>Profile</Heading>
          <Heading> {fbAuth?.loggedInUser && fbAuth.loggedInUser.email}</Heading>
          <Button onClick={() => handleLogout()}>Log out</Button>
          <Button onClick={() => setInEditMode(true)}>Edit profile</Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default Profile;
