import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Switch,
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

  const onAllowMultipleSwitch = async (allowMultipleInvites, guestId) => {
    const { data: rsvpGuest, error } = await supabase
      .from("guest")
      .update({
        allowMultipleInvites: allowMultipleInvites,
      })
      .match({ id: guestId });

    console.log("rsvpGuest", rsvpGuest);
    if (rsvpGuest) getGuests();
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

  const onInvite = (
    email: string,
    url: string,
    firstName: string,
    lastName: string
  ) => {
    sendRsvpForm({
      url: url,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
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
                <Box px={8}>
                  <Text>
                    Can invite multiple:{" "}
                    {guest.allowMultipleInvites ? "yes" : "no"}
                  </Text>
                  <Switch
                    id="allowMultipleInvites"
                    isChecked={guest.allowMultipleInvites}
                    onChange={() =>
                      onAllowMultipleSwitch(
                        !guest.allowMultipleInvites,
                        guest.id
                      )
                    }
                  ></Switch>
                </Box>
                <Button
                  mt="4"
                  type="submit"
                  onClick={() =>
                    onInvite(
                      guest.email,
                      `${window.location.href}/${guest.uuid}`,
                      guest.firstName,
                      guest.lastName
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
