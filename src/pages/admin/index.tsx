import { Box, Link } from "@chakra-ui/react";
import { Login } from "../../components/Login";
import { useAuth } from "../../util/useAuth";
import NextLink from "next/link";
import { NavBar } from "../../components/NavBar";

const Admin = (props) => {
  const { user } = useAuth();
  return (
    <Box padding={6} width="100%">
      {user ? (
        <Box>
          <NavBar />
          <NextLink href="/admin/guest" passHref>
            <Link>Guest</Link>
          </NextLink>
        </Box>
      ) : (
        <Login />
      )}
    </Box>
  );
};

export default Admin;
