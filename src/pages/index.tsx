import {
  Link as ChakraLink,
  Box,
  Flex,
  Heading,
  keyframes,
  Grid,
  GridItem,
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
import { Invitation } from "../components/Invitation";
import { NavBar } from "../components/NavBar";
import image from "../images/003.jpg";

const Index = () => (
  <>
    {/* <Box
      position="absolute"
      height="100%"
      width="100%"
      background="linear-gradient(180deg,transparent 0,transparent 5%,rgba(0,0,0,.4))"
      boxShadow="inset 2000px 0 0 0 rgba(0, 0, 0, 0.5)"
    ></Box> */}
    <Grid templateColumns="3fr 2fr" gap={0} height="100vh">
      <GridItem>
        <Box
          backgroundImage={image.src}
          backgroundPosition="center"
          height="100vh"
          // opacity={0.8}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          overflowY="scroll"
          width="60%"
          position="fixed"
        >
          {/* <Main /> */}
          {/* <Flex
            flex={1}
            alignItems="center"
            justifyContent="center"
            height="100vh"
            flexDirection="column"
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              minHeight="50%"
              width="50%"
              maxWidth={600}
              background="white"
              borderRadius={"5px"}
              margin="auto"
            >
              <Login></Login>
            </Flex>
          </Flex> */}
        </Box>
      </GridItem>
      <GridItem>
        <Invitation />
      </GridItem>
    </Grid>

    <DarkModeSwitch />
  </>
);

export default Index;
