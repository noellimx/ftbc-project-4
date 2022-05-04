import { Sequelize } from "sequelize";

const connectSequelize = (env, configs) => {
  console.log(`[connectSequelize] ${env}`);

  const config = configs[env];

  if (env === "production") {
    console.log(`[Get Db Credentials] production ?=`);
    console.log(config);

    const opts = config;
    const { DATABASE_URL } = process.env;
    return new Sequelize(DATABASE_URL, opts);
  } else if (env === "development") {
    const { database, username, password, host, dialect } = config;

    const opts = {
      host,
      dialect,
    };

    return new Sequelize(database, username, password, opts);
  }

  throw new Error(`[getDbCredentials] Environment not recognised`);
};

export default connectSequelize;
