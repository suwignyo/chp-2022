import { EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Grid,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../util/supabaseClient";

type FormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const Edit = ({ row }) => {
  const [guestData, setGuestData] = useState(row);
  const { register, handleSubmit, setError, reset } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
    defaultValues: useMemo(() => {
      return guestData;
    }, [guestData]),
  });

  useEffect(() => {
    reset(guestData);
  }, [guestData]);

  const onSubmit = async (formData: FormInputs) => {
    const { data: guest, error } = await supabase
      .from("guest")
      .update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      })
      .match({ id: row.id });

    if (guest) {
      onClose();
      getGuest();
    }

    if (error) {
      console.log("error", error);
      return setError("firstName", {
        message:
          "There was an issue submitting your information, please try a different email address or phone number",
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const getGuest = async () => {
    const { data, error } = await supabase
      .from("guest")
      .select(`firstName, lastName, phoneNumber, email`)
      .eq("id", row.id)
      .single();
    setGuestData(data);
  };

  useEffect(() => {
    if (isOpen) {
      getGuest();
    }
  }, [isOpen]);

  const EditInput = (
    <>
      <Grid templateColumns="1fr 1fr" gap={3} mt={3}>
        <Input
          {...register("firstName", {
            required: "First name is required",
          })}
          placeholder="First name"
          type="text"
          borderRadius="0"
        />
        <Input
          {...register("lastName", {
            required: "Last name is required",
          })}
          placeholder="Last name"
          type="text"
          borderRadius="0"
        />
      </Grid>
      <Grid mt={3} templateColumns="1fr 1fr" gap={3}>
        <InputGroup>
          <Input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            id="email"
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
            })}
            borderRadius="0"
          />
          <InputRightElement
            pointerEvents="none"
            children={<PhoneIcon color="gray.300" />}
          />
        </InputGroup>
      </Grid>
    </>
  );
  return (
    <>
      <EditIcon onClick={onOpen}></EditIcon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>{EditInput}</ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Edit;
