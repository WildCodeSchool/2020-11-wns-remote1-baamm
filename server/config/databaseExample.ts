import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = 'mongodb+srv://mansourM:mansour1234@baammcluster.wxcnu.mongodb.net/db_baamm?retryWrites=true&w=majority';
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
