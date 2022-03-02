import {
  Input,
  Box,
  Button,
  Text,
  Flex,
  FormErrorMessage,
  FormControl,
  useToast,
  InputGroup,
  InputRightElement,
  Grid,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../util/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
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
  const reRef = useRef<ReCAPTCHA>();

  const [guestName, setGuestName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const onSubmit = async (formData: FormInputs) => {
    const token = await reRef.current.executeAsync();
    reRef.current.reset();

    const { data: guest, error } = await supabase.from("guest").insert([
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      },
    ]);
    if (error) {
      return setError("firstName", {
        message:
          "There was an issue submitting your information, please try a different email address or phone number",
        // "Invalid token, please email gerrchelle.2022@gmail.com for more information",
      });
    }
    setGuestName(`${guest[0].firstName} ${guest[0].lastName}`);
    sendMail({ ...formData, token: token });
  };

  const toast = useToast();

  const Subscribed = () => (
    <Text color="white">
      Thank you for saving the date! We will send updates to your email!
    </Text>
  );

  const formInvalid = Object.keys(errors).length > 0;

  const sendMail = async (data) => {
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      // toast notification
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
      // toast error message
    }
  };

  return (
    <Box padding={6} maxWidth="500px">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_API_KEY}
        size="invisible"
        ref={reRef}
      />
      <Box py="12">
        {guestName ? (
          <Subscribed />
        ) : (
          <Box data-aos="fade-up">
            <Text textAlign={"center"} color="white">
              Please enter your information to get updates on our wedding.
            </Text>
            <FormControl isInvalid={formInvalid}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns="1fr 1fr" gap={3} mt={3}>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })} // custom message
                    placeholder="First name"
                    type="text"
                    color="white"
                    borderRadius="0"
                  />
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })} // custom message
                    placeholder="Last name"
                    type="text"
                    color="white"
                    borderRadius="0"
                  />
                </Grid>
                <Grid mt={3} templateColumns="1fr 1fr" gap={3}>
                  <InputGroup>
                    <Input
                      {...register("email", {
                        required: "Email is required",
                      })} // custom message
                      placeholder="Email"
                      id="email"
                      color="white"
                      borderRadius="0"
                    />
                    <InputRightElement
                      pointerEvents="none"
                      children={<EmailIcon color="gray.300" />}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      {...register("phoneNumber", {
                        required: "Please enter phone number",
                      })} // custom message
                      color="white"
                      borderRadius="0"
                    />
                    <InputRightElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.300" />}
                    />
                  </InputGroup>
                </Grid>

                <FormErrorMessage>
                  {errors?.firstName?.message}
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
          </Box>
        )}
      </Box>
    </Box>
  );
};
