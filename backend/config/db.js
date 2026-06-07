import mongoose from 'mongoose';

/**
 * Establish connection to MongoDB using Mongoose connection pipeline.
 */
const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://localhost:27017/klosetly';
    
    // Setup connection event listeners
    mongoose.connection.on('connected', () => {
      console.log(`[Database] Mongoose connected to DB: ${mongoose.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`[Database] Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[Database] Mongoose connection disconnected');
    });

    // Handle graceful shutdown on SIGINT (Ctrl+C)
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('[Database] Mongoose connection closed through app termination');
      process.exit(0);
    });

    // Establish the connection
    const conn = await mongoose.connect(connUri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Initial MongoDB connection error: ${error.message}`);
    // We do NOT exit the process here to keep the Express server running,
    // allowing HTTP requests to fail gracefully with a 500 error instead of crashing the process.
  }
};

export default connectDB;
