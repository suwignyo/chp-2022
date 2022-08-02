import { AddIcon, EmailIcon, PhoneIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { times } from "lodash";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  attending: string;
  hasDietaryRestriction: string;
  hasGuest: string;
  dietaryRestriction?: string;
  guests?: { name: string }[];
};

const RsvpForm = ({ guest }) => {
  const [guestCount, setGuestCount] = useState(1);

  const initialValues: FormInputs = {
    firstName: guest?.firstName,
    lastName: guest?.lastName,
    email: guest?.email,
    phoneNumber: guest?.phoneNumber,
    attending: "",
    hasDietaryRestriction: "",
    dietaryRestriction: "",
    guests: [],
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

  const { fields, remove } = useFieldArray({
    name: "guests",
    control,
  });

  console.log("fields", fields);
  console.log("watch", watch());

  const watchHasGuest = watch("hasGuest");
  useEffect(() => {
    if (watchHasGuest === "no") {
      setGuestCount(1);
      remove();
    }
  }, [watchHasGuest, remove]);

  // const onSubmit = () => {
  //   console.log("errors", errors);
  //   console.log("submitted", watch());
  // };

  const toast = useToast();

  const onSubmit = async (formData: FormInputs) => {
    console.log("formData", formData);
  };

  const formInvalid = false;

  return (
    <FormControl isInvalid={formInvalid}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0, 0, 0, 0.2)"
          borderRadius={10}
          mt={8}
          mb={8}
        >
          <FormLabel>First name:</FormLabel>
          <Input
            {...register("firstName", {
              required: "First name is required",
            })}
            placeholder="First name"
            type="text"
            borderRadius="0"
          />
          <FormLabel mt={4}>Last name:</FormLabel>
          <Input
            {...register("lastName", {
              required: "Last name is required",
            })}
            placeholder="Last name"
            type="text"
            borderRadius="0"
          />
          <FormLabel mt={4}>Email:</FormLabel>
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
          <FormLabel mt={4}>Phone number:</FormLabel>
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
        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={10}
          mt={8}
          mb={8}
        >
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

        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={10}
          mt={8}
          mb={8}
        >
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
              <FormLabel mt={4}>Please provide their name:</FormLabel>
              {times(guestCount, (index) => {
                return (
                  <Grid
                    key={`guests${index}`}
                    templateColumns="1fr 20px"
                    alignItems="center"
                    mt={index === 0 ? 0 : 4}
                    gridTemplateColumns="1fr 40px"
                  >
                    <Input
                      {...register(`guests.${index}.name`)}
                      key={`guests${index}`}
                      placeholder="Guest name"
                      type="text"
                      borderRadius="0"
                    />
                    <CloseIcon
                      cursor={"pointer"}
                      onClick={() => {
                        setGuestCount(guestCount - 1);
                        remove(index);
                      }}
                      color="gray.300"
                      ml="2"
                      display={index === 0 ? "none" : "block"}
                    ></CloseIcon>
                  </Grid>
                );
              })}
            </>
          )}
          <Flex
            onClick={() => {
              setGuestCount(guestCount + 1);
            }}
            my={2}
            cursor="pointer"
            alignItems={"center"}
          >
            <AddIcon color="gray.300" mr="2" />
            <Text>Add another guest</Text>
          </Flex>
        </Box>

        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={10}
          mt={8}
          mb={8}
        >
          <FormLabel>
            Do you or your guest have any dietary restrictions?
          </FormLabel>
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
              mt={4}
              name="dietaryRestriction"
              placeholder="Please specify you &amp; your guest dietary restriction(s)"
            />
          )}
        </Box>
        <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        <Flex justifyContent="center">
          <Button
            mt="4"
            mb="8"
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            borderRadius="0"
          >
            RSVP
          </Button>
        </Flex>
      </form>
    </FormControl>
  );
};

export default RsvpForm;
