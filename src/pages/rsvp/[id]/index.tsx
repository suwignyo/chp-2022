import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { supabase } from "../../../util/supabaseClient";

const Rsvp = ({ guest }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Flex flex={1} alignItems="center" justifyContent="flex-end">
      <Box mr={2}>
        Hi, {guest?.firstName} {guest?.lastName}
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
