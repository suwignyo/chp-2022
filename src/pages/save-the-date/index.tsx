import { useEffect, useState } from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useForm } from "react-hook-form";
import { db } from "../../util/initFirebase";

import { collection, getDocs } from "@firebase/firestore";

const SaveTheDate = () => {
  const [guests, setGuests] = useState([]);
  const guestCollection = collection(db, "guests");

  const getGuests = async () => {
    const data = await getDocs(guestCollection);
    console.log("data", data);
    setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (data) => {
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
          placeholder="name"
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
    </Container>
  );
};

export default SaveTheDate;
