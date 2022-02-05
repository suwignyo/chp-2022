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
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import googleImage from "../images/google.png";
import { supabase } from "../util/supabaseClient";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

export const Subscribe = (props) => {
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
  // const [authError, setAuthError] = useState<string | null>(null)
  const [guestName, setGuestName] = useState<string | null>(null);
  const onSubmit = async (formData: FormInputs) => {
    const { data: guest, error } = await supabase.from("guest").insert([
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
    ]);

    console.log("data,error", guest, error);
    setGuestName(`${guest[0].firstName} ${guest[0].lastName}`);
  };

  const Subscribed = () => (
    <Text color="white">
      You are subscribed! Hope to see you at the wedding!
    </Text>
  );
  return (
    <Box padding={6} width="100%">
      {guestName ? (
        <Subscribed />
      ) : (
        <>
          <Text textAlign={"center"} color="white">
            Enter your name and email to get updates on our wedding.
          </Text>
          <FormControl>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel mt={4} htmlFor="email" color="white">
                Email
              </FormLabel>
              <Input
                {...register("email", {
                  required: "Email is required",
                })} // custom message
                placeholder="hello@example.com"
                id="email"
              />
              <FormLabel mt={4} htmlFor="password" color="white">
                Name
              </FormLabel>
              <Input
                {...register("firstName", {
                  required: "First name is required",
                })} // custom message
                placeholder="First name"
                type="text"
              />
              <Input
                {...register("lastName", {
                  required: "Last name is required",
                })} // custom message
                placeholder="Last name"
                type="text"
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              <Flex justifyContent="space-between" textAlign={"right"}>
                <Button
                  mt="4"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Subscribe
                </Button>
              </Flex>
            </form>
          </FormControl>
        </>
      )}
    </Box>
  );
};
