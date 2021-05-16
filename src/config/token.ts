import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_TOKEN =
  process.env.JWT_SECRET_TOKEN || "default-token-secure-azecedszz2";

export { JWT_SECRET_TOKEN };
