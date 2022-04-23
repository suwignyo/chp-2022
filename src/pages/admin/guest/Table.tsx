import { Box } from "@chakra-ui/react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "#",
    selector: (row) => row.count,
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phoneNumber,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Created At",
    selector: (row) => row.created_at,
  },
];

const Table = ({ data }) => {
  return (
    <Box padding={6} width="100%">
      <DataTable title="Guest List" columns={columns} data={data} />
    </Box>
  );
};

export default Table;
