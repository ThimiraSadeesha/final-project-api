import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.schema.js'],
  migrations: ['dist/src/database/migrations/*.js'],
}


const dataSource = new DataSource(dataSourceOptions)
export default dataSource


// host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DATABASE,