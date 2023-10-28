const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

console.log(process.env.DB_STORAGE_PATH)

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": process.env.DB_STORAGE_PATH,
  },
  "test": {
    "dialect": "sqlite",
    "storage": process.env.TEST_DB_STORAGE_PATH,
  },
  "production": {
    "dialect": "sqlite",
    "storage": process.env.PROD_DB_STORAGE_PATH,
  }
}
