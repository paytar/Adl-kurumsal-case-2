import React, { useState,} from "react";
import { SnackbarContext } from "./SnackbarContext";
import { Snackbar, Alert } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const showMessage = (msg: string, t: "success" | "error" = "success") => {
    setMessage(msg);
    setType(t);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={type} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
