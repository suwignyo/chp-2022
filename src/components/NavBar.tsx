import { Box, Button, Flex, FlexProps } from "@chakra-ui/react";
import { useAuth } from "../util/useAuth";
export const NavBar = ({ children }: FlexProps) => {
  const { logout, user } = useAuth();
  console.log("user", user);
  return (
    <Flex flex={1} alignItems="center" justifyContent="flex-end">
      <Box mr={2}>Hi, {user?.displayName ? user.displayName : user.email}</Box>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </Flex>
  );
};
