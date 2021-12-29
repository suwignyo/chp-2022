import { useEffect } from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useForm } from "react-hook-form";
// import { getFirestore } from "firebase/firestore";
// import app from "../../util/firebase";

const SaveTheDate = () => {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  // useEffect(async () => {
  //   app();
  //   const db = getFirestore();

  //   const cityRef = db.collection("guests");
  //   const doc = await cityRef.get();
  //   if (!doc.exists) {
  //     console.log("No such document!");
  //   } else {
  //     console.log("Document data:", doc.data());
  //   }
  // }, []);

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

// you can still disabled the native validation, CSS selectors such as
// invalid and valid still going to work
// <form onSubmit={handleSubmit(onSubmit)} novalidate>

export default SaveTheDate;
