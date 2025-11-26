import { useEmployeeStore } from "../hooks/useEmployeeStore";
import "../styles/employeeModal.scss";

const EmployeeModal = () => {
  const { selectedEmployee, setSelectedEmployee } = useEmployeeStore();

  if (!selectedEmployee) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedEmployee(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedEmployee.name}</h2>
        <p><strong>Department:</strong> {selectedEmployee.department}</p>
        <p><strong>Position:</strong> {selectedEmployee.position}</p>
        <p><strong>Email:</strong> {selectedEmployee.email}</p>
        <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
        <p><strong>Start Date:</strong> {selectedEmployee.startDate}</p>

        <button onClick={() => setSelectedEmployee(null)} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeModal;
