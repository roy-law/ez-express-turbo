import mongoose from "mongoose";
import dotenv from "dotenv";
import { endOfDay } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

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

    const partnersCollection =
      await database.collection("partners");
    const partnersDepots = await database.collection("partnerDepots");

    await database
      .collection("users")
      .aggregate([
        { $match: {} }, // Match all documents (you can modify this to filter documents)
        { $out: "partners" }, // Output to the target collection
      ])
      .toArray();

    await partnersCollection.updateMany(
      {},
      {
        $rename: {
          status: "accountStatus",
        },
        $unset: {
          "isTermsChecked": ""
        }
      }
    );


    await partnersCollection.find().forEach(async (doc) => {
      const depots = await partnersDepots.find({ email: doc.email }, {projection: {_id: 1}}).toArray()
      await partnersCollection.updateOne(
        {
          _id: doc._id,
        },
        {
          $set: {
           depots: depots.map(d => d._id)
          },
        }
      );
    });
  } catch (error) {
    console.error("Unable to connect: ", error);
  } finally {
  }
};

init();
