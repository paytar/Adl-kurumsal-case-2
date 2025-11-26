import { Box, Typography, Paper, useMediaQuery } from "@mui/material";
import { useEmployeeStore } from "../hooks/useEmployeeStore";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";

const COLORS = ["#4e4cafff", "#f1857dff"];

const Dashboard = () => {
  const employees = useEmployeeStore(state => state.employees);
  const isDesktop = useMediaQuery("(min-width:1366px)");

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === "Active").length;
  const passiveEmployees = totalEmployees - activeEmployees;
  const departmentCount = new Set(employees.map(e => e.department)).size;

  const deptData = Array.from(
    employees.reduce((acc, emp) => acc.set(emp.department, (acc.get(emp.department) || 0) + 1), new Map())
  ).map(([department, count]) => ({ department, count }));

  const statusData = [
    { status: "Active", count: activeEmployees },
    { status: "Passive", count: passiveEmployees },
  ];

  const startYearCounts = employees.reduce<Record<string, number>>((acc, emp) => {
    const year = new Date(emp.startDate).getFullYear().toString().toLocaleLowerCase();
    console.log('emp', emp)
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});
  const lineData = Object.entries(startYearCounts).map(([year, count]) => ({ year, count }));

  return (
    <Box sx={{  mt: 4, p: 2,
        width: isDesktop ? "calc(100% - 240px)" : "100%", 
        marginLeft: isDesktop ? "240px" : 0,
        transition: "all 0.3s ease",}}>
      <Typography variant="h4" mb={2}>Dashboard</Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <Paper sx={{ flex: 1, minWidth: 200, p: 2, boxShadow: 3 }}>
          <Typography variant="subtitle1">Total Employees</Typography>
          <Typography variant="h4">{totalEmployees}</Typography>
        </Paper>
        <Paper sx={{ flex: 1, minWidth: 200, p: 2, boxShadow: 3 }}>
          <Typography variant="subtitle1">Active Employees</Typography>
          <Typography variant="h4">{activeEmployees}</Typography>
        </Paper>
        <Paper sx={{ flex: 1, minWidth: 200, p: 2, boxShadow: 3 }}>
          <Typography variant="subtitle1">Passive Employees</Typography>
          <Typography variant="h4">{passiveEmployees}</Typography>
        </Paper>
        <Paper sx={{ flex: 1, minWidth: 200, p: 2, boxShadow: 3 }}>
          <Typography variant="subtitle1">Departments</Typography>
          <Typography variant="h4">{departmentCount}</Typography>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
          <Typography variant="subtitle1" mb={1}>Employees by Department</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData}>
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
          <Typography variant="subtitle1" mb={1}>Employees Status</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                label
              >
                {statusData.map((_entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ flex: 1, minWidth: 300, height: 300 }}>
          <Typography variant="subtitle1" mb={1}>New Employees by Year</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="count" stroke="#ff9800" />
            </LineChart>
          </ResponsiveContainer>
       
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
