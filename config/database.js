import mongoose from 'mongoose';

let connected = false;

export default async function connectDataBase() {
  mongoose.set('strictQuery', true);

  //since Next.js has its own API routes it don't need backend like Express that we can hit to run serverless functions. We can check right here to make sure it don't try to reconnect if it's already connected

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log('MongoDB connected 👌');
  } catch (error) {
    console.log(error);
  }
}
