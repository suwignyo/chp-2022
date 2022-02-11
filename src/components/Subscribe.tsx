import {
  Input,
  Box,
  Button,
  Text,
  Flex,
  FormErrorMessage,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../util/supabaseClient";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ACCESS_CODE = "testcode";
type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  accessCode: string;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  accessCode: "",
};

export const Subscribe = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

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

  const handleReCaptchaVerify = useCallback(async () => {
    console.log("executeRecaptcha", executeRecaptcha);
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("yourAction");
    console.log("token", token);
  }, []);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const [guestName, setGuestName] = useState<string | null>(null);
  const onSubmit = async (formData: FormInputs) => {
    handleReCaptchaVerify();
    if (formData.accessCode === ACCESS_CODE) {
      const { data: guest, error } = await supabase.from("guest").insert([
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
      ]);
      setGuestName(`${guest[0].firstName} ${guest[0].lastName}`);
      sendMail(formData);
      console.log("data,error", guest, error);
    } else {
      setError("accessCode", {
        message:
          "Invalid access code, please email gerrchelle.2022@gmail.com for more information",
      });
    }
  };

  const toast = useToast();

  const Subscribed = () => (
    <Text color="white">
      You are subscribed! Hope to see you at the wedding!
    </Text>
  );
  console.log("errors", errors);

  const formInvalid = Object.keys(errors).length > 0;

  const sendMail = async (data) => {
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      //if sucess do whatever you like, i.e toast notification
      setTimeout(() => {
        reset();
        toast({
          title: "Sent!",
          description: "We've sent a message to your email.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }, 2000);
    } catch (error) {
      // toast error message. whatever you wish
    }
  };
  return (
    <Box padding={6} maxWidth="400px">
      <Box py="12">
        {guestName ? (
          <Subscribed />
        ) : (
          <>
            <Text textAlign={"center"} color="white">
              Enter your name and email to get updates on our wedding.
            </Text>
            <FormControl isInvalid={formInvalid}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <FormLabel mt={4} htmlFor="email" color="white">
                Email
              </FormLabel> */}
                <Input
                  {...register("email", {
                    required: "Email is required",
                  })} // custom message
                  placeholder="Email"
                  id="email"
                  my="2"
                  color="white"
                  borderRadius="0"
                />
                {/* <FormLabel mt={4} htmlFor="password" color="white">
                Name
              </FormLabel> */}
                <Flex>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })} // custom message
                    placeholder="First name"
                    type="text"
                    mr="2"
                    my="2"
                    color="white"
                    borderRadius="0"
                  />
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })} // custom message
                    placeholder="Last name"
                    type="text"
                    ml="2"
                    my="2"
                    color="white"
                    borderRadius="0"
                  />
                </Flex>
                <Input
                  {...register("accessCode", {
                    required: "Please enter access code",
                  })} // custom message
                  placeholder="Access Code"
                  type="text"
                  my="2"
                  color="white"
                  borderRadius="0"
                />

                <FormErrorMessage>
                  {errors?.accessCode?.message}
                </FormErrorMessage>
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                <Flex justifyContent="center">
                  <Button
                    mt="4"
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    borderRadius="0"
                  >
                    Save the Date!
                  </Button>
                </Flex>
              </form>
            </FormControl>
          </>
        )}
      </Box>
    </Box>
  );
};
