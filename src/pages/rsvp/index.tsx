import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../util/supabaseClient";
import { useAuth } from "../../util/useAuth";

const Rsvp = ({}) => {
  const [guestsData, setGuestsData] = useState<any[]>([]);

  const getGuests = async () => {
    const { data, error } = await supabase.from("guest").select();
    setGuestsData(data);
  };

  useEffect(() => {
    getGuests();
  }, []);

  const toast = useToast();

  const { user, loading } = useAuth();

  const sendRsvpForm = async (data) => {
    try {
      await fetch("/api/rsvpInvite", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      toast({
        title: "Sent!",
        description: `Sent email to ${data.email}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {}
  };

  const onInvite = (email: string, url: string) => {
    sendRsvpForm({ url: url, email: email });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.email !== "gsuwignyo@gmail.com") {
    return <div>cannot view</div>;
  }

  return (
    <>
      <Box mr={2}>RSVP index page</Box>
      <Grid>
        {guestsData?.map((guest, index) => {
          return (
            <div key={guest.uuid}>
              <Flex justifyContent="center" alignItems={"center"}>
                <Text mr="4">{index + 1}</Text>
                <Link href={`rsvp/${guest.uuid}`} textDecoration="underline">
                  {guest.firstName} {guest.lastName}
                </Link>
                <Button
                  mt="4"
                  type="submit"
                  onClick={() =>
                    onInvite(
                      guest.email,
                      `${window.location.href}/${guest.uuid}`
                    )
                  }
                  borderRadius="0"
                >
                  Send rsvp email
                </Button>
              </Flex>
            </div>
          );
        })}
      </Grid>
    </>
  );
};

export default Rsvp;
