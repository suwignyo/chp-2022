import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  attending: string;
  hasDietaryRestriction: string;
  hasGuest: string;
  dietaryRestriction?: string;
  guestName: string;
};

const RsvpForm = ({ guest }) => {
  const initialValues: FormInputs = {
    firstName: guest?.firstName,
    lastName: guest?.lastName,
    email: guest?.email,
    phoneNumber: guest?.phoneNumber,
    attending: "",
    hasDietaryRestriction: "",
    dietaryRestriction: "",
    guestName: "",
    hasGuest: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
    defaultValues: initialValues,
  });

  console.log("watch", watch());

  // const onSubmit = () => {
  //   console.log("errors", errors);
  //   console.log("submitted", watch());
  // };

  const toast = useToast();

  const sendRsvpForm = async (data) => {
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      // toast notification
      setTimeout(() => {
        // reset();
        toast({
          title: "Sent!",
          description: "We've sent an email.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }, 1000);
    } catch (error) {
      // toast error message
    }
  };

  const onSubmit = async (formData: FormInputs) => {
    // const { data: guest, error } = await supabase.from("guest").insert([
    //   {
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     email: formData.email,
    //     phoneNumber: formData.phoneNumber,
    //   },
    // ]);
    // if (error?.message?.includes("duplicate")) {
    //   return setAlreadyRegistered(true);
    // }
    // if (error) {
    //   console.log("error", error);
    //   return setError("firstName", {
    //     message:
    //       "There was an issue submitting your information, please try a different email address or phone number",
    //   });
    // }
    // setCurrentGuest(guest[0]);
    sendRsvpForm({ url: "www.google.com", email: guest?.email });
  };
  const formInvalid = false;

  return (
    <FormControl isInvalid={formInvalid}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={8} border="1px solid darkgrey" borderRadius={10} mt={8} mb={8}>
          <FormLabel>First name:</FormLabel>
          <Input
            {...register("firstName", {
              required: "First name is required",
            })}
            placeholder="First name"
            type="text"
            borderRadius="0"
          />
          <FormLabel>Last name:</FormLabel>
          <Input
            {...register("lastName", {
              required: "Last name is required",
            })}
            placeholder="Last name"
            type="text"
            borderRadius="0"
          />
          <FormLabel>Email:</FormLabel>
          <InputGroup>
            <Input
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
              id="email"
              borderRadius="0"
            />
            <InputRightElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
          <FormLabel>Phone number:</FormLabel>
          <InputGroup>
            <Input
              type="tel"
              placeholder="Phone number"
              {...register("phoneNumber", {
                required: "Please enter phone number",
              })}
              borderRadius="0"
            />
            <InputRightElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box p={8} border="1px solid darkgrey" borderRadius={10} mt={8} mb={8}>
          <FormLabel>
            Please select the event(s) you will be attending:
          </FormLabel>
          <Controller
            name="attending"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="column">
                  <Radio value="ceremony">Ceremony on Oct 15, 2022</Radio>
                  <Radio value="reception">Reception on Oct 16, 2022</Radio>
                  <Radio value="both">Both days</Radio>
                  <Radio value="none">None</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </Box>
        <Box p={8} border="1px solid darkgrey" borderRadius={10} mt={8} mb={8}>
          <FormLabel>Do you have any dietary restrictions?</FormLabel>
          <Controller
            name="hasDietaryRestriction"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          {watch("hasDietaryRestriction") === "yes" && (
            <Textarea
              name="dietaryRestriction"
              placeholder="Please specify your dietary restriction(s)"
            />
          )}
        </Box>
        <Box p={8} border="1px solid darkgrey" borderRadius={10} mt={8} mb={8}>
          <FormLabel>Are you bringing a guest with you?</FormLabel>
          <Controller
            name="hasGuest"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          {watch("hasGuest") === "yes" && (
            <>
              <FormLabel>Please provide their name:</FormLabel>
              <Input
                {...register("guestName", {
                  required: "Guest name is required",
                })}
                placeholder="Guest name"
                type="text"
                borderRadius="0"
              />
            </>
          )}
        </Box>

        <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
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
  );
};

export default RsvpForm;
