import React, { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";
import { Delete as DeleteIcon, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useEmployeeStore } from "../hooks/useEmployeeStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import { useSnackbar } from "../context/SnackbarContext";

interface Employee {
  id: string | number;
  name: string;
  department: string;
  position: string;
  status: "Active" | "Passive";
  email: string;
  phone: string;
  startDate: string;
}

interface RowProps {
  employee: Employee;
  allOpen: boolean;
  removeEmployee: (id: string | number) => void;
}

export default function EmployeeTable() {
  const employees = useEmployeeStore((state) => state.employees);
  const searchText = useEmployeeStore((state) => state.searchText);
  const departmentFilter = useEmployeeStore((state) => state.departmentFilter);
  const removeEmployee = useEmployeeStore((state) => state.removeEmployee);
  const { showMessage } = useSnackbar();


  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (departmentFilter === "all" || emp.department === departmentFilter)
  );

  const [allOpen, setAllOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id: string | number) => {
    removeEmployee(id);
    showMessage("Employee deleted successfully!", "success");
  };


  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Add Employee
        </Button>
        <Tooltip title={allOpen ? "Collapse all" : "Expand all"}>
          <IconButton onClick={() => setAllOpen(!allOpen)}>
            {allOpen ? (
              <Box display="flex" flexDirection="column" alignItems="center">
                <KeyboardArrowUp />
                <KeyboardArrowUp />
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center">
                <KeyboardArrowDown />
                <KeyboardArrowDown />
              </Box>
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <AddEmployeeModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", width: "100%", maxHeight: "calc(100vh - 150px)", scrollbarGutter: "stable", }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><Typography sx={{ fontWeight: 600}}>Name</Typography></TableCell>
              <TableCell><Typography sx={{ fontWeight: 600}}>Department</Typography></TableCell>
              <TableCell><Typography sx={{ fontWeight: 600}}>Position</Typography></TableCell>
              <TableCell><Typography sx={{ fontWeight: 600}}>Status</Typography></TableCell>
              <TableCell align="center"><Typography sx={{ fontWeight: 600}}>Delete</Typography></TableCell>
              <TableCell align="center"><Typography sx={{ fontWeight: 600}}>Details</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <Row
                key={emp.id}
                employee={emp}
                allOpen={allOpen}
                removeEmployee={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Row({ employee, allOpen, removeEmployee }: RowProps) {
  const [open, setOpen] = useState(false);
  console.log('employee', employee)


  React.useEffect(() => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}  
      >
        <TableCell>{employee.name}</TableCell>
        <TableCell>{employee.department}</TableCell>
        <TableCell>{employee.position}</TableCell>
        <TableCell>
          {employee.status !== "Active" ? (
            <Typography color="error">{employee.status}</Typography>
          ) : (
            employee.status
          )}
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();  
              removeEmployee(employee.id);
            }}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); 
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="subtitle1">Details:</Typography>
              <Typography variant="body2">Email: {employee.email}</Typography>
              <Typography variant="body2">Phone: {employee.phone}</Typography>
              <Typography variant="body2">Start Date: {employee.startDate}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
