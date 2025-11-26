import { createContext, useContext } from "react";

export interface SnackbarContextProps {
  showMessage: (msg: string, type?: "success" | "error") => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
