import { Box, useColorMode, FlexProps } from "@chakra-ui/react";
import image from "../images/003.jpg";

export const Container = ({ children }: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <>
      <Box
        position="absolute"
        height="100%"
        width="100%"
        background="linear-gradient(180deg,transparent 0,transparent 5%,rgba(0,0,0,.4))"
        boxShadow="inset 2000px 0 0 0 rgba(0, 0, 0, 0.5)"
      ></Box>
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
        {children}
      </Box>
    </>
  );
};
