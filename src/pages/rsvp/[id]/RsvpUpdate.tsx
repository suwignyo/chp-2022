import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

const RsvpUpdate = ({ setShowForm }) => {
  return (
    <Box
      p={8}
      boxShadow="2px 4px 8px rgba(0,0,0,0.2)"
      borderRadius={2}
      mt={8}
      mb={8}
      textAlign="center"
    >
      <Text>
        Thank you for submitting your RSVP request, please click the link below
        if you would like to update your selections.
      </Text>
      <Button mt="4" borderRadius="0" onClick={() => setShowForm(true)}>
        Update
      </Button>
    </Box>
  );
};

export default RsvpUpdate;
