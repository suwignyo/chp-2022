import {
  Link as ChakraLink,
  Box,
  Flex,
  Heading,
  keyframes,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Twirl as Hamburger } from "hamburger-react";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Login } from "../components/Login";
import { Layout } from "../components/Layout";
import { Invitation } from "../components/Invitation";
import { NavBar } from "../components/NavBar";
import image from "../images/003.jpg";
import { useState } from "react";
import theme from "../theme";

const Index = () => {
  const [isOpen, setOpen] = useState(false);
  console.log("isOpen", isOpen);
  return (
    <>
      {/* <Box
      position="absolute"
      height="100%"
      width="100%"
      background="linear-gradient(180deg,transparent 0,transparent 5%,rgba(0,0,0,.4))"
      boxShadow="inset 2000px 0 0 0 rgba(0, 0, 0, 0.5)"
    ></Box> */}
      <Grid templateColumns={["1fr", "3fr 2fr"]} gap={0} height="100vh">
        <GridItem>
          {/* <Box zIndex={2} position="absolute" top={5} left={5}>
            <Menu onClose={() => setOpen(false)}>
              <MenuButton onClick={() => setOpen((prevState) => !prevState)}>
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="white"
                  borderRadius="5"
                  p="2"
                  height="48px"
                >
                  <Hamburger size={24} toggled={isOpen} />{" "}
                  <span style={{ paddingRight: "8px" }}>Menu</span>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Save the Date</MenuItem>
              </MenuList>
            </Menu>
          </Box> */}
          <Image
            src={image.src}
            alt="gm2022"
            objectFit="cover"
            height={["50vh", "100vh"]}
            width={["100%", "60%"]}
            position={["relative", "fixed"]}
          ></Image>

          {/* <Box
          backgroundImage={image.src}
          backgroundPosition="center"
          height={["50%", "100vh"]}
          // opacity={0.8}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          overflowY="scroll"
          width={["100%", "60%"]}
          position="fixed"
        > */}
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
          {/* </Box> */}
        </GridItem>
        <GridItem>
          <Invitation />
        </GridItem>
      </Grid>
    </>
  );
};

export default Index;
