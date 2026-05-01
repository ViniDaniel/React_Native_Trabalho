import { Routes } from "./src/routes";
import { useEffect, useState } from "react";
import { createTables } from "./src/database/db";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "./src/context/authContext"; // <- adicione
import { ThemeProvider } from "./src/global/themeContext";

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function initDB() {
      await createTables();
      setDbReady(true);
    }
    initDB();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
