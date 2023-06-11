import constants from './constants';

export default (() => {
  const environment = {
    port: process.env.PORT || 4000,
    database: {
      dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
      url: process.env.DATABASE_URI || '',
    },
    jwtSecretKey: process.env.JWT_SECRET_KEY || "secret",
  };

  return environment;
})();
