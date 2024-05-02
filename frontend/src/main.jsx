import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App.jsx"; // Import the main App component

// Create a context with initial state
export const Context = createContext({
  isAuthorized: false,
});

// Create a wrapper component to provide context to the entire app
const AppWrapper = () => {
  // Define state variables for authorization status and user data
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  // Render the App component wrapped in the context provider
  return (
    <Context.Provider
      value={{
        isAuthorized, // Authorization status
        setIsAuthorized, // Function to set authorization status
        user, // User data
        setUser, // Function to set user data
      }}
    >
      <App /> {/* Render the main App component */}
    </Context.Provider>
  );
};

// Use ReactDOM to render the AppWrapper component into the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper /> {/* Render the AppWrapper component */}
  </React.StrictMode>
);
