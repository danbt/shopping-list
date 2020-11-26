import {
  Button,
  Center,
  Input,
  Container,
  FormLabel,
  FormControl,
  FormHelperText,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  VStack,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fbAuth = useAuth();
  const onSubmit = async (data: Inputs) => {
    try {
      setIsLoading(true);
      await fbAuth?.loginFn(data.email, data.password);
    } catch {
      setErrorText("Could not login user");
    }
    setIsLoading(false);
  };

  return (
    <Container p="3">
      <VStack>
        {errorText && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Oh no!</AlertTitle>
            <AlertDescription>{errorText}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
        {fbAuth?.loggedInUser && <div>{fbAuth.loggedInUser.email}</div>}
      </VStack>
      <Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email-address" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              colorScheme="pink"
              name="email"
              ref={register({ required: true })}
              placeholder="Email..."
              disabled={isLoading}
            />
            <FormHelperText>{errors.email && <span>Email is required.</span>}</FormHelperText>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              colorScheme="pink"
              name="password"
              ref={register({ required: true })}
              type="password"
              disabled={isLoading}
            />
            <FormHelperText>{errors.password && <span>Password is required.</span>}</FormHelperText>
          </FormControl>

          <Button colorScheme="pink" isFullWidth type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Center>
    </Container>
  );
};

export default Login;
