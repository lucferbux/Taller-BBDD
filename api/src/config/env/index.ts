import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: string | number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  secret: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'example_db'
  },
  secret: process.env.SECRET || 'secret'
};

const production: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'example_db'
  },
  secret: process.env.SECRET || 'secret'
};

const test: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
    MONGODB_DB_MAIN: `${process.env.MONGODB_DB_MAIN || 'example_db'}_testing`
  },
  secret: process.env.SECRET || 'secret'
};

const config: {
  [name: string]: IConfig;
} = {
  test,
  development,
  production
};

export default config[NODE_ENV];
