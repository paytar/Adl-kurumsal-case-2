import Filters from "../components/Filters";
import EmployeeTable from "../components/EmployeeTable";
import { Box, useMediaQuery } from "@mui/material";

export default function Employees() {

  const isDesktop = useMediaQuery("(min-width:1366px)");
  return (
     <Box
      sx={{
        p: 2,
        width: isDesktop ? "calc(100% - 240px)" : "100%", 
        marginLeft: isDesktop ? "240px" : 0,
        transition: "all 0.3s ease",
      }}
    >
      <Filters />
      <EmployeeTable />
    </Box>
  );
}
