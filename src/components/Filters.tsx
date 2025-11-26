import { useEmployeeStore } from "../hooks/useEmployeeStore";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export default function Filters() {
  const searchText = useEmployeeStore((state) => state.searchText);
  const setSearchText = useEmployeeStore((state) => state.setSearchText);
  const departmentFilter = useEmployeeStore((state) => state.departmentFilter);
  const setDepartmentFilter = useEmployeeStore((state) => state.setDepartmentFilter);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }} 
      alignItems={{ xs: "stretch", sm: "center" }}
      justifyContent="space-between"
      gap={2}
      marginBottom={3}
      marginTop={5}
    >
      <TextField
        label="Search Employee"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        size="small"
      />

      <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          label="Department"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
