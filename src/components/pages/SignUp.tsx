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
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUp: FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fbAuth = useAuth();
  const onSubmit = async (data: Inputs) => {
    if (data.password !== data.passwordConfirmation) {
      setErrorText("Your passwords do not match!");
    } else {
      try {
        setErrorText("");
        setIsLoading(true);
        await fbAuth?.signUpFn(data.email, data.password);
      } catch {
        setErrorText("Could not create user");
      }
      setIsLoading(false);
    }
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
      </VStack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email-address" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            autoComplete="username"
            colorScheme="brandGreen"
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
            autoComplete="current-password"
            colorScheme="brandGreen"
            name="password"
            ref={register({ required: true })}
            type="password"
            disabled={isLoading}
          />
          <FormHelperText>{errors.password && <span>Password is required.</span>}</FormHelperText>
        </FormControl>
        <FormControl id="passwordConfirmation" isRequired>
          <FormLabel>Password Confirmation</FormLabel>
          <Input
            autoComplete="current-password"
            colorScheme="brandGreen"
            name="passwordConfirmation"
            ref={register({ required: true })}
            type="password"
            disabled={isLoading}
          />
          <FormHelperText>{errors.password && <span>Password confirmation is required.</span>}</FormHelperText>
        </FormControl>

        <Button colorScheme="brandOrange" isFullWidth type="submit" disabled={isLoading}>
          Sign up
        </Button>
        <Center mt="1">
          <Link to="/login">
            <Button variant="link" colorScheme="brand">
              Login
            </Button>
          </Link>
        </Center>
      </form>
    </Container>
  );

  // return (
  //   <Container p="3">
  //     <VStack>
  //       {errorText && (
  //         <Alert status="error">
  //           <AlertIcon />
  //           <AlertTitle mr={2}>Oh no!</AlertTitle>
  //           <AlertDescription>{errorText}</AlertDescription>
  //           <CloseButton position="absolute" right="8px" top="8px" />
  //         </Alert>
  //       )}
  //     </VStack>
  //     <Center>
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //         <FormControl id="email-address" isRequired>
  //           <FormLabel>Email address</FormLabel>
  //           <Input
  //             colorScheme="pink"
  //             name="email"
  //             ref={register({ required: true })}
  //             placeholder="Email..."
  //             disabled={isLoading}
  //           />
  //           <FormHelperText>{errors.email && <span>Email is required.</span>}</FormHelperText>
  //         </FormControl>
  //         <FormControl id="password" isRequired>
  //           <FormLabel>Password</FormLabel>
  //           <Input
  //             colorScheme="pink"
  //             name="password"
  //             ref={register({ required: true })}
  //             type="password"
  //             disabled={isLoading}
  //           />
  //           <FormHelperText>{errors.password && <span>Password is required.</span>}</FormHelperText>
  //         </FormControl>
  //         <FormControl id="password-confirmation" isRequired>
  //           <FormLabel>Password Confirmation</FormLabel>
  //           <Input
  //             colorScheme="pink"
  //             name="passwordConfirmation"
  //             ref={register({ required: true })}
  //             type="password"
  //             disabled={isLoading}
  //           />
  //           <FormHelperText>
  //             {errors.passwordConfirmation && <span>Password confirmation is required.</span>}
  //           </FormHelperText>
  //         </FormControl>
  //         <Button colorScheme="pink" isFullWidth type="submit" disabled={isLoading}>
  //           Sign-up
  //         </Button>
  //         <Link to="/login">
  //           <Button colorScheme="gray" isFullWidth>
  //             Go to Login
  //           </Button>
  //         </Link>
  //       </form>
  //     </Center>
  //   </Container>
  // );
};

export default SignUp;
