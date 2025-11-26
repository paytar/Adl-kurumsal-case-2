
export type Status = "Active" | "Passive";

export interface Employee {
  startDate: string;
  id: string | number;
  name: string;
  department: string;
  position: string;
  status: Status;
  email: string;
  phone: string;
}
