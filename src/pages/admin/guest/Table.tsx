import { Box, Grid, Input, Text, Flex, Button } from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Edit from "./Edit";
import { CSVLink } from "react-csv";

const Guest = ({ jsonString }) => {
  return (
    <>
      {jsonString?.map((additionalGuestsJson) => {
        const extraGuests = JSON.parse(additionalGuestsJson);
        return (
          <Grid key={extraGuests.name} gridTemplateColumns="2fr 1fr">
            <Text pr={3}>{extraGuests.name}</Text>
            <Text>{extraGuests.attending}</Text>
          </Grid>
        );
      })}
    </>
  );
};
const Table = ({ data }) => {
  let bothCount = 0;
  let receptionCount = 0;
  let ceremonyCount = 0;
  let extraGuestsCount = 0;
  let guestReceptionCount = 0;
  let guestBothCount = 0;
  let guestCeremonyCount = 0;
  const hasRsvpedCount = data?.reduce((prev, guest) => {
    if (guest.attending === "both") bothCount++;
    if (guest.attending === "ceremony") ceremonyCount++;
    if (guest.attending === "reception") receptionCount++;
    if (guest.hasGuest) {
      extraGuestsCount = extraGuestsCount + guest.guests.length;
      const moreGuests = guest.guests;
      moreGuests.forEach((more) => {
        const moreObject = JSON.parse(more);
        if (moreObject.attending === "both") guestBothCount++;
        if (moreObject.attending === "ceremony") guestCeremonyCount++;
        if (moreObject.attending === "reception") guestReceptionCount++;
      });
    }
    return guest.rsvp ? prev + 1 : prev;
  }, 0);

  // console.log("bothCount", bothCount);
  // console.log("receptionCount", receptionCount);
  // console.log("ceremonyCount", ceremonyCount);
  // console.log("extraGuestsCount", extraGuestsCount);
  // console.log("guestBothCount", guestBothCount);
  // console.log("guestReceptionCount", guestReceptionCount);
  // console.log("guestCeremonyCount", guestCeremonyCount);
  const attendanceList = data?.reduce((prev, guest) => {
    let guestArr = [
      {
        name: `${guest.firstName} ${guest.lastName}`,
        attending: guest.attending,
        email: guest.email,
        phoneNumber: guest.phoneNumber,
      },
    ];
    if (guest.hasGuest) {
      const moreGuests = guest.guests;
      moreGuests.forEach((more) => {
        const moreObject = JSON.parse(more);
        guestArr.push(moreObject);
      });
    }
    return [...prev, ...guestArr];
  }, []);

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
      name: "Updated At",
      selector: (row) => format(new Date(row.updatedAt), "MM/dd/yyyy HH:mm"),
      sortable: true,
      width: "200px",
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
      name: <div>Guest(s) ({extraGuestsCount}) - Attending</div>,
      sortable: true,
      selector: (row) => row.guest,
      cell: (row) => <Guest jsonString={row.guests} />,
      width: "300px",
      grow: 1,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr",
      },
    },
    {
      name: "Has dietaryRestriction",
      sortable: true,
      selector: (row) => row.hasDietaryRestriction,
      cell: (row) => <div>{row.hasDietaryRestriction ? "true" : "false"}</div>,
    },
    {
      name: "Dietary Restriction",
      selector: (row) => row.dietaryRestriction,
      sortable: true,
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
      <Box>Attendance total</Box>
      <Box>Both: {bothCount + guestBothCount}</Box>
      <Box>Reception total: {receptionCount + guestReceptionCount}</Box>
      <Box>Ceremony total: {ceremonyCount + guestCeremonyCount}</Box>
      <CSVLink data={data}>
        <Button mt={3}>Export list to csv</Button>
      </CSVLink>
      <CSVLink data={attendanceList}>
        <Button mt={3}>Just name</Button>
      </CSVLink>

      <DataTable title="Guest List" columns={columns} data={filteredItems} />
    </Box>
  );
};

export default Table;
