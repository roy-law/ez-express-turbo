import mongoose from "mongoose";
import dotenv from "dotenv";
import {  endOfDay } from "date-fns";
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
    
    const businessparcelsCollection =
      await database.collection("businessparcels");

    await database
      .collection("parcels")
      .aggregate([
        { $match: {} }, // Match all documents (you can modify this to filter documents)
        { $out: "businessparcels" }, // Output to the target collection
      ])
      .toArray();

    await businessparcelsCollection.updateMany(
      {},
      {
        $rename: {
          companyId: "partner",
          depotId: "partnerDepot",
        },
      }
    );

    function getEndOfDayIsoStringWithDateFns(isoDateString) {
      const timeZone = "America/Toronto";
      const utcDate = new Date(isoDateString);
      const torontoDate = utcToZonedTime(utcDate, timeZone);
      const endOfDayDate = endOfDay(torontoDate);
      const endOfDayUtc = zonedTimeToUtc(endOfDayDate, timeZone);
      return endOfDayUtc.toISOString();
    }

    await businessparcelsCollection.find().forEach(async (doc) => {
      await businessparcelsCollection.updateOne(
        {
          _id: doc._id,
        },
        {
          $set: {
            scheduledDeliveryTimeWindow: {
              from: doc.createdAt,
              to: new Date(getEndOfDayIsoStringWithDateFns(doc.createdAt)),
            },
          },
        }
      );
    });
  } catch (error) {
    console.error("Unable to connect: ", error);
  } finally {
    mongoose.connection.close();
  }
};

init();
