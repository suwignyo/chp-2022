import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavBar } from "../../../components/NavBar";
import { supabase } from "../../../util/supabaseClient";
import Table from "./Table";

const Guest = (props) => {
  const [guestData, setGuestData] = useState<any[]>([]);
  const getGuest = async () => {
    const { data, error } = await supabase.from("guest").select();
    const dataWithNumber = data.map((guest, index) => {
      return { ...guest, count: index + 1 };
    });
    setGuestData(dataWithNumber);
  };

  useEffect(() => {
    getGuest();
  }, []);

  return (
    <Box padding={6} width="100%">
      <NavBar />
      <Table data={guestData}></Table>
    </Box>
  );
};

export default Guest;
