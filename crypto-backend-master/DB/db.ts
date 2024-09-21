import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';

const URI = process.env.MONGODB_URL;

if (!URI) {
    throw new Error("MONGODB_URL environment variable is not set.");
}

const connection = (): mongoose.Connection => {
    const options: ConnectOptions = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        tls: true,
        tlsAllowInvalidCertificates: false,
        useUnifiedTopology: true, // Add this line
    };

    const connectWithRetry = (): void => {
        mongoose.connect(URI, options)
            .then(() => {
                console.log('Mongoose is connected');
            })
            .catch(err => {
                console.error('Mongoose connection error: ', err);
                setTimeout(connectWithRetry, 5000);
            });
    };

    connectWithRetry();

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose is disconnected');
        connectWithRetry();
    });

    mongoose.connection.on('error', (err: Error) => {
        console.error('Mongoose connection error: ', err);
        connectWithRetry();
    });

    process.on('SIGINT', () => {
        console.log('app is terminating');
        mongoose.connection.close();
        console.log('Mongoose default connection closed');
        process.exit(0);
    });

    return mongoose.connection;
};

export default connection;
