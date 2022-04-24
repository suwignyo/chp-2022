import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavBar } from "../../../components/NavBar";
import { supabase } from "../../../util/supabaseClient";
import Table from "./Table";
import { format } from "date-fns";

const Guest = (props) => {
  const [guestData, setGuestData] = useState<any[]>([]);
  const getGuest = async () => {
    const { data, error } = await supabase.from("guest").select();
    const dataWithNumber = data.map((guest, index) => {
      const formattedDate = format(new Date(guest.created_at), "MM/dd/yyyy");

      return {
        ...guest,
        created_at: formattedDate,
        count: index + 1,
      };
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
