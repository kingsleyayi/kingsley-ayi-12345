import * as dotenv from "dotenv";
dotenv.config();

export const databaseName = process.env.DATABASE_NAME;
export const databaseHost = process.env.DATABASE_HOST;
export const databaseUsername = process.env.DATABASE_USERNAME;
export const databasePassword = process.env.DATABASE_PASSWORD;
export const databasePort = Number(process.env.DATABASE_PORT);

export const nodeEnv = process.env.NODE_ENV;
export const logDir = process.env.LOG_DIR;
