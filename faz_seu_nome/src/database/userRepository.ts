import { getDB } from "./db";
import { User } from "../types/user";

export async function insertUser(nome: string, cpf:string, email: string, password: string) {

  const db = await getDB();

  await db.runAsync(
    "INSERT INTO users (nome, cpf, email, password) VALUES (?,?,?,?)",
    [nome, cpf, email,password]
  );

}

export async function findUserByEmail(email:string): Promise<User | null> {

  const db = await getDB();

  const result = await db.getFirstAsync<User>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return result ?? null;
}
