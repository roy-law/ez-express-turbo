import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.gvjoyaq.mongodb.net/`;

const init = async () => {
  /** Connect to Mongo */
  try {
    console.log(MONGO_URL);
    await mongoose.connect(MONGO_URL, {
      retryWrites: true,
      w: "majority",
      dbName: process.env.MONGO_DB_NAME || "test",
    });

    const database = mongoose.connection;

    const partnersDepotsCollection = await database.collection("partnerDepots");
    const partnersCollection = await database.collection("partners");

    await database
      .collection("depots")
      .aggregate([
        { $match: {} }, // Match all documents (you can modify this to filter documents)
        { $out: "partnerDepots" }, // Output to the target collection
      ])
      .toArray();

    await partnersDepotsCollection.find().forEach(async (doc) => {
        const partner = await partnersDepotsCollection.findOne({ email: doc.email });
      await partnersDepotsCollection.updateOne(
        {
          _id: doc._id,
        },
        {
          $set: {
            partner: partner._id
          },
        }
      );
    });
  } catch (error) {
    console.error("Unable to connect: ", error);
  } finally {
    // mongoose.connection.close();
  }
};

init();
