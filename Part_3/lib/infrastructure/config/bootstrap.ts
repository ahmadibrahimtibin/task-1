import dotenv from 'dotenv';
import constants from './constants';
import environment from './environment';

dotenv.config();

export default {
  async init() {
    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
      require('../orm/mongoose/mongoose');
    }
  },
};
