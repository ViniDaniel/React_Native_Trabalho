import { Routes } from "./src/routes";
import { useEffect, useState } from "react";
import { createTables } from "./src/database/db";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "./src/context/authContext"; // <- adicione

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
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
