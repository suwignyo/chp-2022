import { Box, Grid, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Edit from "./Edit";

const Guest = ({ jsonString }) => {
  return (
    <Box>
      {jsonString?.map((additionalGuestsJson) => {
        const extraGuests = JSON.parse(additionalGuestsJson);
        return (
          <Grid key={extraGuests.name} gridTemplateColumns="1fr 1fr">
            <Text>{extraGuests.name}</Text>
            <Text>{extraGuests.attending}</Text>
          </Grid>
        );
      })}
    </Box>
  );
};
const Table = ({ data }) => {
  const hasRsvpedCount = data?.reduce(
    (prev, guest) => (guest.rsvp ? prev + 1 : prev),
    0
  );

  const extraGuestsCount = data?.reduce((prev, guest) => {
    return prev + guest.guests.length;
  }, 0);
  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: <div>Has Rsvp&apos;d ({hasRsvpedCount})</div>,
      sortable: true,
      selector: (row) => row.rsvp,
      cell: (row) => <div>{row.rsvp ? "true" : "false"}</div>,
    },
    {
      name: "Attending",
      selector: (row) => row.attending,
      sortable: true,
    },
    {
      name: "Has guest",
      sortable: true,
      selector: (row) => row.hasGuest,
      cell: (row) => <div>{row.hasGuest ? "true" : "false"}</div>,
    },
    {
      name: <div>Guest(s) ({extraGuestsCount})</div>,
      sortable: true,
      selector: (row) => row.guest,
      cell: (row) => <Guest jsonString={row.guests} />,
    },
    {
      name: "Edit",
      button: true,
      cell: (row) => <Edit row={row} />,
    },
  ];

  const [filterText, setFilterText] = useState("");
  const filteredItems = data?.filter(
    (guest) =>
      (guest.firstName &&
        guest.firstName.toLowerCase().includes(filterText.toLowerCase())) ||
      (guest.lastName &&
        guest.lastName.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <Box padding={6} width="100%">
      <Input
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search first or last name"
      ></Input>
      <DataTable title="Guest List" columns={columns} data={filteredItems} />
    </Box>
  );
};

export default Table;
