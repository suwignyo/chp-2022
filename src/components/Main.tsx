import { Box, Flex, Heading, keyframes } from "@chakra-ui/react";

const scroll = keyframes`
  0% {opacity: 1;}
  100% {opacity: 0; transform: translateY(46px);}
`;

const scrollAnimation = `${scroll} infinite 1s`;
export const Main = () => (
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
        animation: scrollAnimation,
        position: "absolute",
        left: "50%",
      }}
    ></Box>
  </Flex>
);
