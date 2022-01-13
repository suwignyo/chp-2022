import {
  Input,
  Box,
  Button,
  Text,
  Heading,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../util/initFirebase";
import { useAuth } from "../util/useAuth";
import googleImage from "../images/google.png";

type FormInputs = {
  email: string;
  password: string;
};

const initialValues = {
  email: "",
  password: "",
};

export const Login = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
    defaultValues: initialValues,
  });
  // const [authError, setAuthError] = useState<string | null>(null);
  console.log("ERRORS", errors);
  const { push } = useRouter();
  const [isSigningUp, setSigningUp] = useState<boolean>(false);
  const { user, logout } = useAuth();

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
      ).then(() => {
        push("/save-the-date");
      });
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      if (error.message.includes("auth/user-not-found")) {
        setError("email", { message: "User not found, please register" });
      }
      if (error.message.includes("auth/wrong-password")) {
        setError("email", {
          message: "You have entered an invalid username or password",
        });
      }
    }
  };
  const registerUser = async (data: FormInputs) => {
    console.log("data", data);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(() => {
        push("/save-the-date");
      });
      console.log("user", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <Box padding={6} width="100%">
      <Heading textAlign={"center"}>
        {isSigningUp ? "Register" : "Login"}
      </Heading>
      <FormControl isInvalid={!!errors.email || !!errors.password}>
        <form onSubmit={handleSubmit(isSigningUp ? registerUser : login)}>
          <FormLabel mt={4} htmlFor="email">
            Email
          </FormLabel>
          <Input
            {...register("email", {
              required: "Email is required",
            })} // custom message
            placeholder="hello@example.com"
            id="email"
          />
          <FormLabel mt={4} htmlFor="password">
            Password
          </FormLabel>
          <Input
            {...register("password", {
              required: "Password is required",
            })} // custom message
            placeholder="********"
            type="password"
            id="password"
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          <Flex justifyContent="space-between" textAlign={"right"}>
            <Button
              mt="4"
              size="sm"
              variant="link"
              onClick={() => {
                reset(initialValues);
                setSigningUp((prevState) => !prevState);
              }}
            >
              {isSigningUp ? "Login" : "Register"}
            </Button>
            <Button
              mt="4"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSigningUp ? "Register" : "Login"}
            </Button>
          </Flex>
        </form>
      </FormControl>
      <Flex alignItems="center" justifyContent="center" flex={1} mt={6}>
        <Button type="button" onClick={signInWithGoogle}>
          <Image
            height="24px"
            width="24px"
            mr={2}
            src={googleImage.src}
          ></Image>
          Sign in with Google
        </Button>
      </Flex>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
      <Text>{user ? user.email : "no user logged in"}</Text>
    </Box>
  );
};
