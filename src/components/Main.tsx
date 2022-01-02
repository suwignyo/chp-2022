import { Box, BoxProps, Stack, StackProps } from "@chakra-ui/react";

export const Main = ({ children }: BoxProps) => (
  <>
    <Box
      backgroundImage="https://source.unsplash.com/random/1920x1080"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      height="100vh"
      width="100vw"
      opacity={0.8}
      position="absolute"
    ></Box>
    {children}
  </>
);
