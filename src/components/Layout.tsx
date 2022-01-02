import { Box, BoxProps, Stack, StackProps } from "@chakra-ui/react";
import image from "../images/003.jpg";
export const Layout = ({ children }: BoxProps) => (
  <Stack direction="row">
    <Box
      // backgroundImage={image.src}
      backgroundImage="https://images.unsplash.com/photo-1557182307-a2fd5bcafedd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2844&q=80"
      backgroundPosition="center"
      height="100vh"
      width="20vw"
      opacity={0.8}
      // position="absolute"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    ></Box>
    <Box w="60vw">{children}</Box>
    <Box
      // backgroundImage={image.src}
      backgroundImage="https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2362&q=80"
      backgroundPosition="center"
      height="100vh"
      width="20vw"
      opacity={0.8}
      // position="absolute"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    ></Box>
  </Stack>
);

//https://images.unsplash.com/photo-1557182307-a2fd5bcafedd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2844&q=80

//https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2362&q=80
