import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { getDB } from "../../database/db";

export default function TestDB() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const db = await getDB();
      const result = await db.getAllAsync("SELECT * FROM users");
      setUsuarios(result);
    }
    fetchUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Usuários no Banco</Text>

      {usuarios.length === 0 ? (
        <Text style={styles.empty}>Nenhum usuário cadastrado</Text>
      ) : (
        usuarios.map((u, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.label}>ID: <Text style={styles.value}>{u.id}</Text></Text>
            <Text style={styles.label}>Nome: <Text style={styles.value}>{u.nome}</Text></Text>
            <Text style={styles.label}>CPF: <Text style={styles.value}>{u.cpf}</Text></Text>
            <Text style={styles.label}>Email: <Text style={styles.value}>{u.email}</Text></Text>
            <Text style={styles.label}>Senha: <Text style={styles.value}>{u.password}</Text></Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontWeight: "normal",
    color: "#333",
  },
});
