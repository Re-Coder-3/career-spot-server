import dotenv from "dotenv";
dotenv.config();

// export const config: any = {
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: "3306",
// };

export interface TestDbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

export interface ProductionDbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

// *   ! 붙인것은 Non-null assertion operator 입니다.
export const test: TestDbConfig = {
  host: "127.0.0.1",
  username: process.env.EHDDNR_DB_USER!,
  password: process.env.EHDDNR_DB_PASSWORD!,
  database: process.env.EHDDNR_DB_NAME!,
  port: 3306,
};

export const production: ProductionDbConfig = {
  host: process.env.DB_HOST!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  port: 3306,
};
