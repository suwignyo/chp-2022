import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Edit from "./Edit";

const columns = [
  {
    name: "#",
    selector: (row) => row.count,
    sortable: true,
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
    name: "Edit",
    button: true,
    cell: (row) => <Edit row={row} />,
  },
];

const Table = ({ data }) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
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
