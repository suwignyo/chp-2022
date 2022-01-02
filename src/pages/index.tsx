import {
  Link as ChakraLink,
  Box,
  Flex,
  Heading,
  keyframes,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Login } from "../components/Login";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import image from "../images/003.jpg";

const scroll = keyframes`
  0% {opacity: 1;}
  100% {opacity: 0; transform: translateY(46px);}
`;

const scrollAnimation = `${scroll} infinite 1s`;
const Index = () => (
  <>
    {/* <Box
      position="absolute"
      height="100%"
      width="100%"
      background="linear-gradient(180deg,transparent 0,transparent 5%,rgba(0,0,0,.4))"
    ></Box> */}
    <Box
      backgroundImage={image.src}
      backgroundPosition="center"
      height="100vh"
      opacity={0.8}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      overflowY="scroll"
      backgroundAttachment="fixed"
      width="100%"
      position="fixed"
    >
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        flexDirection="column"
      >
        <Heading color="white">Gerry &amp; Michelle</Heading>
        <Heading color="white">10.15.2022</Heading>
        <Box
          width={"40px"}
          height={70}
          boxShadow="inset 0 0 0 1px white"
          borderRadius="25px"
          animation="fadeIn"
          marginTop={"70vh"}
          position="absolute"
          _before={{
            content: '""',
            width: "8px",
            height: "8px",
            background: "white",
            marginLeft: "-4px",
            top: "8px",
            borderRadius: "4px",
            // animationDuration: "1.5s",
            // animationIterationCount: "infinite",
            // animationName: "scroll",
            animation: scrollAnimation,
            position: "absolute",
            left: "50%",
          }}
        ></Box>
      </Flex>
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        flexDirection="column"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          height="50%"
          width="50%"
          maxWidth={600}
          minHeight={350}
          background="white"
          borderRadius={"5px"}
          margin="auto"
        >
          <Login></Login>
        </Flex>
      </Flex>
    </Box>
    <DarkModeSwitch />
  </>
);

export default Index;
