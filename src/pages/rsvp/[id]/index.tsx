import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { supabase } from "../../../util/supabaseClient";
import { RsvpForm } from "./RsvpForm";

const Rsvp = ({ guest }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Flex flex={1} alignItems="center" justifyContent="center">
      <Box width={["90vw", "60vw", "50vw", "35vw"]}>
        Hi, {guest?.firstName} {guest?.lastName}! We are excited to have you at
        our wedding! Please fill out the form below as soon as you can!
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
