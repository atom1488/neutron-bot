import mongoose from "mongoose";

mongoose
    .connect(
        `mongodb+srv://neutronbot:${process.env.mongoDbPass}@neutron.5cl8zjm.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to Mongo Database"))
    .catch((e) => console.error(e));
