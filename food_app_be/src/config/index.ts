import dotenv from "dotenv";
dotenv.config();
export const { PORT, JWT_SECRET, BASE_URL, DATABASE_URL } = process.env;