import type { Employee } from "../types/employee";
import { useEmployeeStore } from "../hooks/useEmployeeStore";

interface Props {
  employee: Employee;
}

export default function EmployeeCard({ employee }: Props) {
  const setSelectedEmployee = useEmployeeStore((state) => state.setSelectedEmployee);

  return (
    <div className="employee-card" onClick={() => setSelectedEmployee(employee)}>
      <div className="name">{employee.name}</div>
      <div className="department">{employee.department}</div>
      <div className="status">{employee.status}</div>
    </div>
  );
}
