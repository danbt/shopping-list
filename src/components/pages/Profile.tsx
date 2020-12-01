import React, { FC, useState } from "react";
import {
  Center,
  Box,
  VStack,
  Container,
  Heading,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  CircularProgress,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useAppState } from "../../contexts/AppStateContext";
import Template from "../sections/Template";

const Profile: FC = () => {
  const [errorText, setErrorText] = useState("");
  const [inEditMode, setInEditMode] = useState(false);
  const fbAuth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const appState = useAppState();

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

  const getRandomAvatarSeed = () => {
    return (Math.random() * (10000 - 1) + 1).toString();
  };

  if (isLoading) {
    return <CircularProgress isIndeterminate />;
  }

  if (inEditMode) {
    return (
      <Template title="My Profile">
        <HStack spacing={3} align="center" justify="center">
          <Button variant="outline" colorScheme="brandYellow" minWidth="100px" onClick={() => setInEditMode(false)}>
            Cancel
          </Button>
          <Button variant="solid" colorScheme="brandRed" minWidth="100px" onClick={() => console.log("SAVE")}>
            Save
          </Button>
        </HStack>
      </Template>
    );
  }
  return (
    <Template title="My Profile">
      <VStack width="100%" spacing={3}>
        <Button variant="solid" colorScheme="brandYellow" minWidth="200px" onClick={() => setInEditMode(true)}>
          Edit profile
        </Button>
        <Button
          variant="solid"
          colorScheme="brandYellow"
          minWidth="200px"
          onClick={() => appState?.setAvatarSrc(getRandomAvatarSeed())}
        >
          Randomise Avatar
        </Button>
        <Button variant="solid" colorScheme="brandOrange" minWidth="200px" onClick={() => handleLogout()}>
          Log out
        </Button>
      </VStack>
    </Template>
  );
};

export default Profile;
