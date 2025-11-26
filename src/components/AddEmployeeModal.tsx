import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useEmployeeStore } from "../hooks/useEmployeeStore";
import type { Employee, Status } from "../types/employee";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useSnackbar } from "../context/SnackbarContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  department: string;
  position: string;
  status: Status;
  email: string;
  phone: string;
}

const AddEmployeeModal: React.FC<Props> = ({ open, onClose }) => {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  const { showMessage } = useSnackbar();

  const predefinedPositions = Array.from(
    new Set([...employees.map((e) => e.position), "Developer", "Designer", "Manager", "QA"])
  );

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      department: "",
      position: "",
      status: "Active",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.position && !predefinedPositions.includes(data.position)) {
      predefinedPositions.push(data.position);
    }

    const newEmployee: Employee = {
       // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      name: data.name,
      department: data.department,
      position: data.position,
      status: data.status,
      email: data.email,
      phone: data.phone,
      startDate: new Date().toISOString().split("T")[0],
    };

    addEmployee(newEmployee);

    showMessage("Employee added successfully!", "success");

    reset();     
    onClose();   
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="department"
            control={control}
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select {...field} label="Department">
                  {Array.from(new Set(employees.map((e) => e.department))).map((dep) => (
                    <MenuItem key={dep} value={dep}>
                      {dep}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.department?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Passive">Passive</MenuItem>
                </Select>
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="position"
            control={control}
            rules={{ required: "Position is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.position}>
                <InputLabel>Position</InputLabel>
                <Select {...field} label="Position">
                  {predefinedPositions.map((pos) => (
                    <MenuItem key={pos} value={pos}>
                      {pos}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.position?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
