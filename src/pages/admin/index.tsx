import { Button, Input, Text } from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useForm } from "react-hook-form";
import { getFirestore, collection } from "firebase/firestore";

const Index = () => {
  return (
    <Container height="100vh">
      <Text>Admin</Text>
    </Container>
  );
};

// you can still disabled the native validation, CSS selectors such as
// invalid and valid still going to work
// <form onSubmit={handleSubmit(onSubmit)} novalidate>

export default Index;
