require("dotenv").config();
const {MongoClient} = require("mongodb");

const uri = process.env.MONGO_URI ;

let client;
const connectMongo = async () => {
    if (!client){
        try {
            client = await MongoClient.connect(uri);
            console.log("Welldone Victor Database is Connected")
        } catch (error) {
            console.error(error)
        };
    };
    return client;
};

const getConnectedClient = () => client;

module.exports  = {connectMongo, getConnectedClient};