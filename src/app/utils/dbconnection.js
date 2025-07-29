import mongoose from "mongoose";

export default async function dbconnection() {
    try {
        await mongoose.connect(process.env.MONGODDB_URI);
        console.log("Database connected");
    } catch(err){
        console.log(err)
        throw err;
    }
}

module.exports = dbconnection;