import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Text,
  Flex,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useForm } from "react-hook-form";
import { db } from "../../util/initFirebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../util/useAuth";

type FormInputs = {
  firstName: string;
  lastName: string;
  phoneNumber: number;
};

const SaveTheDate = () => {
  const { user, loading, logout } = useAuth();
  console.log("user.email", user.email);
  const [guests, setGuests] = useState([]);
  const guestCollection = collection(db, "guests");

  const getGuests = async () => {
    const data = await getDocs(guestCollection);
    console.log("data", data);
    setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const { register, handleSubmit } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (data: FormInputs) => {
    await addDoc(guestCollection, {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: user.email,
      subscribedAt: new Date(),
    });
    console.log(data);
  };

  useEffect(() => {
    getGuests();
  }, []);
  console.log("guests", guests);

  if (loading || !user) return <CircularProgress />;
  return (
    <Container>
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        flexDirection="column"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          minHeight="50%"
          width="50%"
          maxWidth={600}
          background="white"
          borderRadius={"5px"}
          margin="auto"
        >
          <Box p={6} flex={1}>
            <Heading mb={4} textAlign={"center"}>
              Save The Date
            </Heading>
            <FormControl isInvalid={false}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormLabel mt={4} htmlFor="firstName">
                  First Name
                </FormLabel>
                <Input
                  {...register("firstName", {
                    required: "Please enter your first name.",
                  })} // custom message
                  placeholder="first name"
                />
                <FormLabel mt={4} htmlFor="lastName">
                  Last Name
                </FormLabel>
                <Input
                  {...register("lastName", {
                    required: "Please enter your first name.",
                  })} // custom message
                  placeholder="last name"
                />

                <FormLabel mt={4} htmlFor="phoneNumber">
                  Phone Number
                </FormLabel>
                <Input
                  {...register("phoneNumber", {
                    required: "Please enter your first name.",
                  })} // custom message
                  placeholder="phone number"
                />
                <Button textAlign="right" mt={4} type="submit">
                  Submit
                </Button>
              </form>
            </FormControl>
          </Box>
        </Flex>
      </Flex>
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
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export default SaveTheDate;
