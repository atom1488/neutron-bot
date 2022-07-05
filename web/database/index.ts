import mongoose from 'mongoose';

mongoose
  .connect(process.env.mongoDbURI as string)
  .then(() => console.log('Connected to Mongo Database'))
  .catch((e) => console.error(e));
