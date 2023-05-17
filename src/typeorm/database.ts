import "reflect-metadata"
import { DataSource } from 'typeorm';
import { databaseHost, databasePort, databaseUsername, databasePassword, databaseName } from '../config/environmentvariables';
import entities from './entities';

const appDataSource = new DataSource({
  type: 'mysql',
  host: databaseHost,
  port: databasePort,
  username: databaseUsername,
  password: databasePassword,
  database: databaseName,
  entities,
  synchronize: true,
});

export default appDataSource;
