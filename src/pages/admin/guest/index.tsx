import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavBar } from "../../../components/NavBar";
import { supabase } from "../../../util/supabaseClient";
import Table from "./Table";
import { format } from "date-fns";

const Guest = (props) => {
  const buildGuestData = (guestArray) => {
    return guestArray.map((guest, index) => {
      const formattedDate = format(new Date(guest.created_at), "MM/dd/yyyy");

      return {
        ...guest,
        created_at: formattedDate,
        count: index + 1,
      };
    });
  };

  const [guestsData, setGuestsData] = useState<any[]>([]);
  const getGuests = async () => {
    const { data, error } = await supabase.from("guest").select();
    setGuestsData(buildGuestData(data));
  };

  useEffect(() => {
    getGuests();
  }, []);

  useEffect(() => {
    const guestListener = supabase
      .from("guest")
      .on("*", (payload) => {
        const newGuest = payload.new;
        setGuestsData((oldGuests) => {
          const exists = oldGuests.find((guest) => guest.id === newGuest.id);
          let newGuests;
          if (exists) {
            const oldTodoIndex = oldGuests.findIndex(
              (obj) => obj.id === newGuest.id
            );
            oldGuests[oldTodoIndex] = newGuest;
            newGuests = oldGuests;
          } else {
            newGuests = [...oldGuests, newGuest];
          }
          return buildGuestData(newGuests);
        });
      })
      .subscribe();

    return () => {
      guestListener.unsubscribe();
    };
  }, []);

  return (
    <Box padding={6} width="100%">
      <NavBar />
      <Table data={guestsData}></Table>
    </Box>
  );
};

export default Guest;
