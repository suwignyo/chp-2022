import {
  Flex,
  Container,
  Image,
  Stack,
  StackProps,
  FlexProps,
  Box,
  Heading,
} from "@chakra-ui/react";
import image from "../images/003.jpg";
export const NavBar = ({ children }: FlexProps) => (
  <Flex
    flex={1}
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <Heading>Gerry &amp; Michelle</Heading>
    <Box
      backgroundImage={image.src}
      backgroundPosition="center"
      // opacity={0.8}
      // position="absolute"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      height="200px"
      width="400px"
      my="3rem"
    ></Box>
  </Flex>
);

//https://images.unsplash.com/photo-1557182307-a2fd5bcafedd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2844&q=80

//https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2362&q=80
