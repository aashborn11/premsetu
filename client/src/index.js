import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "16px",
              border: "1px solid rgba(124, 45, 18, 0.12)",
              background: "rgba(255, 253, 249, 0.97)",
              color: "#1c1917",
              boxShadow: "0 8px 28px rgba(0,0,0,0.11)"
            },
            success: {
              iconTheme: { primary: "#7c2d12", secondary: "#fef3ee" }
            },
            error: {
              iconTheme: { primary: "#dc2626", secondary: "#fff1f0" }
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
