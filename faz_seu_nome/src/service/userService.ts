import * as Crypto from "expo-crypto";
import { insertUser, findUserByEmail } from "../database/userRepository";
import { userValidation } from "../validations/userValidation";

// Gera um salt aleatório
function generateSalt(length = 16): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) {
    salt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return salt;
}

// Hash da senha com salt
async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt();
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    salt + password,
  );
  // Salva salt + hash juntos para poder comparar depois
  return `${salt}:${hash}`;
}

// Compara a senha informada com o hash salvo
async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [salt, originalHash] = stored.split(":");
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    salt + password,
  );
  return hash === originalHash;
}

export async function createUser(
  nome: string,
  cpf: string,
  email: string,
  password: string,
) {
  const error = userValidation(nome, cpf, email, password);
  if (error) throw new Error(error);

  const userExist = await findUserByEmail(email);
  if (userExist) throw new Error("EMAIL_JA_CADASTRADO");

  const hashedPassword = await hashPassword(password);
  await insertUser(nome, cpf, email, hashedPassword);
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Usuário não encontrado");

  const senhaValida = await verifyPassword(password, user.password);
  if (!senhaValida) throw new Error("Senha incorreta");

  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
  };
}
