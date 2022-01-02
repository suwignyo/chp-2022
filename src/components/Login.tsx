import {
  Flex,
  useColorMode,
  FlexProps,
  Input,
  Box,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../util/initFirebase";

type FormInputs = {
  email: string;
  password: string;
};

export const Login = (props) => {
  const { register, handleSubmit } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (currentUser) => {
    console.log("currentUser", currentUser);
    setUser(currentUser);
  });

  const login = async () => {};
  const registerUser = async (data: FormInputs) => {
    console.log("data", data);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser;
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
      <Heading textAlign={"center"}>Login</Heading>
      <form onSubmit={handleSubmit(registerUser)}>
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
        <Box textAlign={"right"}>
          <Button mt="6" type="submit">
            Login
          </Button>
        </Box>
        <Text>{user ? user.email : "no user logged in"}</Text>
      </form>
      {/* <Button type="button" onClick={logout}>
        Logout
      </Button> */}
    </Box>
  );
};
