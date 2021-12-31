import { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useForm } from "react-hook-form";
import { db } from "../../util/initFirebase";

import { collection, getDocs, addDoc } from "@firebase/firestore";

type FormInputs = {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
};

const SaveTheDate = () => {
  const [guests, setGuests] = useState([]);
  const guestCollection = collection(db, "guests");

  const getGuests = async () => {
    const data = await getDocs(guestCollection);
    console.log("data", data);
    setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // const createGuests = async (formValues) => {
  //   // const data = await getDocs(guestCollection);
  //   // console.log("data", data);
  //   // setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   await addDoc(guestCollection, {})
  // };

  const { register, handleSubmit } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (data: FormInputs) => {
    await addDoc(guestCollection, {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      subscribedAt: new Date(),
    });
    console.log(data);
  };

  useEffect(() => {
    getGuests();
  }, []);
  console.log("guests", guests);

  return (
    <Container height="100vh">
      <Text>Save the date</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("firstName", {
            required: "Please enter your first name.",
          })} // custom message
          placeholder="first name"
        />
        <Input
          {...register("lastName", {
            required: "Please enter your first name.",
          })} // custom message
          placeholder="last name"
        />
        <Input
          {...register("email", {
            required: "Please enter your first name.",
          })} // custom message
          placeholder="email"
        />
        <Input
          {...register("phoneNumber", {
            required: "Please enter your first name.",
          })} // custom message
          placeholder="phone number"
        />
        <Button type="submit">Submit</Button>
      </form>
      {guests.map((guest) => {
        return (
          <Box key={guest.id}>
            <Box>
              {guest.firstName} {guest.lastName}
            </Box>
            <Box>{guest.email}</Box>
            <Box>{guest.phoneNumber}</Box>
          </Box>
        );
      })}
    </Container>
  );
};

export default SaveTheDate;
