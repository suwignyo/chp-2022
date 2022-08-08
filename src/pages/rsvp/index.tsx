import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
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

  const onAddEmailSentTimes = async (timesSent, guestId) => {
    const { data: rsvpGuest, error } = await supabase
      .from("guest")
      .update({
        emailSent: timesSent,
      })
      .match({ id: guestId });

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
        <Heading textAlign={"center"}>HAS NOT RSVP&apos;ed</Heading>
        {guestsData?.map((guest, index) => {
          return (
            <>
              {!guest.rsvp && (
                <Flex
                  justifyContent="center"
                  alignItems={"center"}
                  my={4}
                  key={guest.uuid}
                >
                  <Flex p={6} boxShadow="2px 4px 8px rgba(0,0,0,0.2)">
                    <Text mr="4">{index + 1}</Text>
                    <Link
                      href={`rsvp/${guest.uuid}`}
                      textDecoration="underline"
                    >
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
                    <Box px={8}>
                      <Text>Email sent: {guest.emailSent} times</Text>
                      <Button
                        type="submit"
                        onClick={() => {
                          onInvite(
                            guest.email,
                            `${window.location.href}/${guest.uuid}`,
                            guest.firstName,
                            guest.lastName
                          );
                          onAddEmailSentTimes(guest.emailSent + 1, guest.id);
                        }}
                        borderRadius="0"
                      >
                        Send rsvp email
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              )}
            </>
          );
        })}

        <Heading textAlign={"center"} mt={10}>
          HAS RSVP&apos;ed
        </Heading>

        {guestsData?.map((guest, index) => {
          return (
            <>
              {guest.rsvp && (
                <Flex
                  justifyContent="center"
                  alignItems={"center"}
                  my={4}
                  key={guest.uuid}
                >
                  <Flex p={6} boxShadow="2px 4px 8px rgba(0,0,0,0.2)">
                    <Text mr="4">{index + 1}</Text>
                    <Link
                      href={`rsvp/${guest.uuid}`}
                      textDecoration="underline"
                    >
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
                    <Box px={8}>
                      <Text>Email sent: {guest.emailSent} times</Text>
                      <Button
                        type="submit"
                        onClick={() => {
                          onInvite(
                            guest.email,
                            `${window.location.href}/${guest.uuid}`,
                            guest.firstName,
                            guest.lastName
                          );
                          onAddEmailSentTimes(guest.emailSent + 1, guest.id);
                        }}
                        borderRadius="0"
                      >
                        Send rsvp email
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              )}
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default Rsvp;
