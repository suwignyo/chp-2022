import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { supabase } from "../../../util/supabaseClient";
import RsvpForm from "./RsvpForm";

const Rsvp = ({ guest }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Flex flex={1} alignItems="center" justifyContent="center">
      <Box width={["90vw", "60vw", "50vw", "35vw"]}>
        <Heading
          textAlign="center"
          display="block"
          color="burgundy"
          size="2xl"
          pl="6"
          pt="6"
          pb="4"
        >
          Gerry &amp; Michelle
        </Heading>
        <Text
          textAlign="center"
          display="block"
          color="burgundy"
          fontSize="20px"
        >
          Saturday, October, 15 2022
        </Text>
        <Divider mx="auto" width="10" height="4px" my="2" bg="petal" />
        <Text
          textAlign="center"
          display="block"
          color="burgundy"
          fontSize="20px"
          mb="36px"
        >
          Sunday, October, 16 2022
        </Text>

        <Text textAlign={"center"}>
          Hi, {guest?.firstName} {guest?.lastName}! We are excited to have you
          at our wedding!{" "}
          {!guest?.rsvp &&
            `Please fill out the form below before September 2,
            2022!`}
        </Text>
        {guest ? <RsvpForm guest={guest} /> : <div>loading</div>}
      </Box>
    </Flex>
  );
};

export async function getStaticPaths() {
  const { data, error } = await supabase.from("guest").select("uuid");
  const paths = data.map((guest) => ({
    params: { id: JSON.stringify(guest.uuid) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("guest")
    .select()
    .filter("uuid", "eq", id)
    .single();
  return {
    props: {
      guest: data,
    },
  };
}

export default Rsvp;
