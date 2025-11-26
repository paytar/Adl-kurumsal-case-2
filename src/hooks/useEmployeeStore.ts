import { create } from "zustand";
import type { Employee } from "../types/employee";
import { EMPLOYEES } from "../api/employees";

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null ;
  searchText: string ;
  departmentFilter: string ;
  setSelectedEmployee: (employee: Employee | null) => void;
  setSearchText: (text: string) => void;
  setDepartmentFilter: (dep: string) => void;
  addEmployee: (employee: Employee) => void;
  removeEmployee: (id: string | number) => void;
}

const loadEmployees = (): Employee[] => {
  const stored = localStorage.getItem("employees");
  return stored ? JSON.parse(stored) : EMPLOYEES;
};

const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem("employees", JSON.stringify(employees));
console.log('employees', employees)
};

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: loadEmployees(),
  selectedEmployee: null,
  searchText: "",
  departmentFilter: "all",
  
  setSelectedEmployee: (emp) => set({ selectedEmployee: emp }),
  setSearchText: (text) => set({ searchText: text }),
  setDepartmentFilter: (dep) => set({ departmentFilter: dep }),
  addEmployee: (employee) => {
    set((state) => {
      const updated = [...state.employees, employee];
      saveEmployees(updated); 
      return { employees: updated };
    });
  },
  removeEmployee: (id) => {
    set((state) => {
      const updated = state.employees.filter((emp) => emp.id !== id);
      saveEmployees(updated); 
      return { employees: updated };
    });
  },
}));
