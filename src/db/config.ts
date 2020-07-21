import * as dotenv from 'dotenv';
dotenv.config();

export const config:any = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: '3306',
}