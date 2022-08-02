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
import { ErrorMessage } from "@hookform/error-message";
import { supabase } from "../../../util/supabaseClient";
import RsvpUpdate from "./RsvpUpdate";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  attending: "reception" | "ceremony" | "both" | "none" | "";
  hasDietaryRestrictions: string;
  hasGuest: string;
  dietaryRestriction?: string;
  guests?: { name: string }[];
  songRecommendation?: string;
  mailingAddress?: string;
  notes?: string;
};

const RsvpForm = ({ guest }) => {
  const [guestCount, setGuestCount] = useState(guest?.guests.length || 1);
  const [showForm, setShowForm] = useState(false);

  const parsedGuest = guest?.guests.map((name) => {
    return JSON.parse(name);
  });

  const initialValues: FormInputs = {
    firstName: guest?.firstName,
    lastName: guest?.lastName,
    email: guest?.email,
    phoneNumber: guest?.phoneNumber,
    attending: guest?.attending,
    hasDietaryRestrictions: guest?.hasDietaryRestrictions ? "yes" : "no",
    dietaryRestriction: guest?.dietaryRestriction,
    guests: parsedGuest,
    hasGuest: guest?.hasGuest ? "yes" : "no",
    songRecommendation: guest?.songRecommendation,
    mailingAddress: guest?.mailingAddress,
    notes: guest?.notes,
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

  const watchHasGuest = watch("hasGuest");
  const watchHasDietaryRestrictions = watch("hasDietaryRestrictions");

  const { fields, remove } = useFieldArray({
    name: "guests",
    control,
  });

  useEffect(() => {
    if (watchHasGuest === "no") {
      setGuestCount(1);
      remove();
    }
  }, [watchHasGuest, remove]);

  const toast = useToast();

  const onSubmit = async (formData: FormInputs) => {
    const { data: rsvpGuest, error } = await supabase
      .from("guest")
      .update({
        rsvp: true,
        hasGuest: formData.hasGuest === "yes" ? true : false,
        guests: formData.hasGuest === "yes" ? formData.guests : [],
        attending: formData.attending,
        hasDietaryRestrictions:
          formData.hasDietaryRestrictions === "yes" ? true : false,
        dietaryRestriction:
          formData.hasDietaryRestrictions === "yes"
            ? formData.dietaryRestriction
            : "",
        songRecommendation: formData.songRecommendation,
        mailingAddress: formData.mailingAddress,
      })
      .match({ id: guest.id });

    if (rsvpGuest) {
      toast({
        title: "Success!",
        description: "You have submitted your RSVP, see you at our wedding!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setShowForm(false);
    }
  };

  const formInvalid = false;

  if (guest?.rsvp && !showForm) {
    return <RsvpUpdate setShowForm={setShowForm} />;
  }

  return (
    <FormControl isInvalid={formInvalid}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={2}
          mt={8}
          mb={8}
        >
          <FormLabel>
            Please select the event(s) you will be attending:
          </FormLabel>
          <Controller
            name="attending"
            control={control}
            rules={{ required: "Please select an option" }}
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
          <ErrorMessage
            errors={errors}
            name="attending"
            render={({ message }) => (
              <Text mt={2} color="red">
                {message}
              </Text>
            )}
          />
        </Box>

        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={2}
          mt={8}
          mb={8}
        >
          <FormLabel>Are you bringing a guest with you?</FormLabel>
          <Controller
            name="hasGuest"
            control={control}
            rules={{ required: "Please select an option" }}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onChange={onChange} value={value}>
                <Stack direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="hasGuest"
            render={({ message }) => (
              <Text mt={2} color="red">
                {message}
              </Text>
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
              {guest?.allowMultipleInvites && (
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
              )}
            </>
          )}
        </Box>

        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={2}
          mt={8}
          mb={8}
        >
          <FormLabel>
            Do you or your guest have any dietary restrictions?
          </FormLabel>
          <Controller
            name="hasDietaryRestrictions"
            rules={{ required: "Please select an option" }}
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
          {watch("hasDietaryRestrictions") === "yes" && (
            <>
              <Textarea
                mt={4}
                {...register("dietaryRestriction", {
                  required: watchHasDietaryRestrictions,
                })}
                placeholder="Please specify you &amp; your guest dietary restriction(s)"
              />
              <ErrorMessage
                errors={errors}
                name="dietaryRestriction"
                render={() => (
                  <Text mt={2} color="red">
                    Please specify you &amp; your guest dietary restriction(s)
                  </Text>
                )}
              />
            </>
          )}
        </Box>
        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={2}
          mt={8}
          mb={8}
        >
          <FormLabel>Do you have any song recommendation(s)?</FormLabel>
          <Textarea
            mt={4}
            {...register("songRecommendation")}
            placeholder="Song recommendation(s)"
          />
        </Box>
        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={2}
          mt={8}
          mb={8}
        >
          <FormLabel>Please provide your mailing address:</FormLabel>
          <Textarea
            mt={4}
            {...register("mailingAddress")}
            placeholder="Your mailing address"
          />
        </Box>
        <Box
          p={8}
          boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
          borderRadius={2}
          mt={8}
          mb={8}
        >
          <FormLabel>Additional notes:</FormLabel>
          <Textarea
            mt={4}
            {...register("notes")}
            placeholder="Any additional notes you would like to share with us"
          />
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
            Submit RSVP
          </Button>
        </Flex>
      </form>
    </FormControl>
  );
};

export default RsvpForm;
