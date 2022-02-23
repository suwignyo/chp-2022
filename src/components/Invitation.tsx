import {
  Link as ChakraLink,
  Flex,
  Heading,
  Text,
  keyframes,
  Box,
  Image,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { supabase } from "../util/supabaseClient";
import { Subscribe } from "./Subscribe";

import barnImage from "../images/barn.png";
import churchImage from "../images/church.png";

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
  days,
}: CountdownTimeDelta) => {
  if (completed) {
    // Render a completed state
    return <Text>ITS TODAY!</Text>;
  } else {
    return (
      <Text color="burgundy" fontSize="16px">
        {days} DAYS {hours} HOURS {minutes} MIN {seconds} sec
      </Text>
    );
  }
};

export const Invitation = () => {
  const arrow = keyframes`
  0% {opacity: 1;}
  100% {opacity: 0; transform: translate(-10px, -10px);}
`;

  const guest = async () => {
    const { data: guest, error } = await supabase.from("guest").select();
    return { guest, error };
  };

  // console.log(
  //   "guest",
  //   guest().then((data) => console.log(data))
  // );
  const scrollAnimation = `${arrow} infinite 1s`;

  const weddingDate = new Date(2022, 10, 15);

  return (
    <>
      <Flex
        flex="1"
        height={["auto", "100vh"]}
        bg="cream"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        py="12"
      >
        <Heading
          textAlign="center"
          display="block"
          color="burgundy"
          size="2xl"
          pl="6"
        >
          Gerry &amp; Michelle
        </Heading>
        <button className="hamburger" type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        {/* <Heading
          textAlign="center"
          mt="4"
          display="block"
          color="burgundy"
          size="lg"
          my="24px"
        >
          Country Heritage Park
        </Heading> */}
        <Image mt="6" height="48px" width="48px" src={churchImage.src}></Image>

        <Text display="block" color="burgundy" fontSize="20px">
          St. Josephine Bakhita
        </Text>
        <Text display="block" color="burgundy" fontSize="20px">
          Mississauga, ON, Canada
        </Text>
        <Text display="block" color="burgundy" fontSize="20px" mb="24px">
          October, 15 2022
        </Text>
        <Image height="48px" width="48px" src={barnImage.src}></Image>
        <Text display="block" color="burgundy" fontSize="20px">
          Country Heritage Park
        </Text>
        <Text display="block" color="burgundy" fontSize="20px">
          Gambrel Barn
        </Text>
        <Text display="block" color="burgundy" fontSize="20px">
          Milton, ON, Canada
        </Text>
        <Text display="block" color="burgundy" fontSize="20px" mb="24px">
          October, 16 2022
        </Text>
        <Countdown date={weddingDate} renderer={renderer} autoStart={true} />
        <Box display={["none", "block"]} position="absolute" bottom={10}>
          <Box
            width="40px"
            height="40px"
            top="20%"
            margin="-20px 0 0 -20px"
            transform="rotate(45deg)"
            borderLeft="none"
            borderTop="none"
            borderRight="2px #fff solid"
            borderBottom="2px #fff solid"
            _before={{
              position: "absolute",
              left: "50%",
              content: '""',
              width: "20px",
              height: "20px",
              top: "50%",
              margin: "-10px 0 0 -10px",
              borderLeft: "none",
              borderTop: "none",
              borderRight: "1px #fff solid",
              borderBottom: "1px #fff solid",
              animationDuration: "2s",
              animationIterationCount: "infinite",
              animationName: "arrow",
              animation: scrollAnimation,
            }}
          ></Box>
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        bg="burgundy"
      >
        <Subscribe />
      </Flex>
    </>
  );
};
