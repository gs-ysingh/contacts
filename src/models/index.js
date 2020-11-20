import 'dotenv/config';
import mongoose from 'mongoose';
 
import User from './user';
import Message from './message';
 
const connectDb = () => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};
 
const models = { User, Message };
 
export { connectDb };
 
export default models;