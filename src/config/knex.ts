import dotenv from 'dotenv';
import "dotenv/config";
import Knex from "knex";
dotenv.config({ path: './config.env' });

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const  knex = Knex({
    client: "pg",
    connection: {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS,
    },
    searchPath: ["knex", "public"],
    pool: {min: 0, max: 10},
})

export const onDataBaseConnected = async () => knex.raw("SELECT 1+1 as result")
export default knex;