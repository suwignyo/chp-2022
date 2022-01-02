import { Input, Box, Button, Text, Heading, Flex } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../util/initFirebase";
import { useAuth } from "../util/useAuth";

type FormInputs = {
  email: string;
  password: string;
};

export const Login = (props) => {
  const { register, handleSubmit } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });

  const [isSigningUp, setSigningUp] = useState<boolean>(false);
  const { user } = useAuth();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const login = async (data: FormInputs) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const registerUser = async (data: FormInputs) => {
    console.log("data", data);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Box padding={6}>
      <Heading textAlign={"center"}>
        {isSigningUp ? "Register" : "Login"}
      </Heading>
      <form onSubmit={handleSubmit(isSigningUp ? registerUser : login)}>
        <Input
          {...register("email", {
            required: "Email is required",
          })} // custom message
          placeholder="Email"
          mt="6"
        />
        <Input
          {...register("password", {
            required: "Password is required",
          })} // custom message
          placeholder="Password"
          type="password"
          mt={6}
        />
        <Flex justifyContent="space-between" textAlign={"right"}>
          <Button
            mt="6"
            size="sm"
            variant="link"
            onClick={() => setSigningUp((prevState) => !prevState)}
          >
            {isSigningUp ? "Login" : "Register"}
          </Button>
          <Button mt="6" type="submit">
            {isSigningUp ? "Register" : "Login"}
          </Button>
        </Flex>
        <Text>{user ? user.email : "no user logged in"}</Text>
      </form>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
      <Button type="button" onClick={signInWithGoogle}>
        Google
      </Button>
    </Box>
  );
};
