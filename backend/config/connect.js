const mongoose = require('mongoose');
require('dotenv').config();

async function mongoConnect() {
  const user = process.env.DB_USER;
  const passwd = process.env.DB_PASSWD;
  let databaseName;

  if (process.env.NODE_ENV === 'prod') {
    databaseName = process.env.DB_NAME_PROD;
  } else if (process.env.NODE_ENV === 'test') {
    databaseName = process.env.DB_NAME_TEST;
  } else {
    databaseName = process.env.DB_NAME;
  }
  console.log(user, passwd, databaseName);
  try {
    const uri = `mongodb+srv://${user}:${passwd}@miguelcluster0.egcdt.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

    const mongooseConnect = await mongoose.connect(uri);

    return mongooseConnect;
  } catch (error) {
    console.log('sale el EEEERRROOOORRR', error);
  }
}

module.exports = { mongoConnect };
