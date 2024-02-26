import express from "express";
import http from "http";
import mongoose from "mongoose";
import RateLimit from "express-rate-limit";
import compression from "compression";
import helmet from "helmet";
import { config } from "./config/config";
import Logging from "./library/Logging";
import depotRoutes from "./routes/Depot";
import parcelRoutes from "./routes/Parcel";
import customerParcelRoutes from "./routes/BusinessParcel.depot";
import adminParcelRoutes from "./routes/BusinessParcel.admin";
import customerBusinessPartnerDepotRoutes from "./routes/PartnerDepot.depot";
import customerBusinessPartnerRoutes from "./routes/Partner.depot";
import adminBusinessPartnerRoutes from "./routes/Partner.admin";
import authHealthCheckRoutes from "./routes/AuthHealthCheck";
import userRoutes from "./routes/User";
import scheduleRoutes from "./routes/Schedule";
import exceptionScheduleRoutes from "./routes/ExceptionSchedule";
import driverRoutes from "./routes/Driver";

const router = express();

//** Protect endpoints */
router.use(helmet());

//** Compress data */
router.use(compression());

//** Rate limiter max 20 requests per minute */
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});
router.use(limiter);

/** Only start the server if Mongo Connects */
const StartServer = () => {
  router.use((req, res, next) => {
    const requestUrl = req.url;
    /** Log the Request */
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${requestUrl}] -IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the Response*/
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${requestUrl}] -IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Healthcheck */
  router.use("/api/authHealthCheck", authHealthCheckRoutes);

  /** Routes */
  router.use("/api/depot", depotRoutes);
  router.use("/api/parcel", parcelRoutes);
  router.use("/api/user", userRoutes);
  router.use("/api/schedule", scheduleRoutes);
  router.use("/api/driver", driverRoutes);
  router.use("/api/exceptionSchedule", exceptionScheduleRoutes);

  // V2 routes
  router.use("/api/business-parcel/partner", customerParcelRoutes);
  router.use("/api/business-parcel/admin", adminParcelRoutes);
  router.use("/api/employee", employeeRoutes);
  router.use("/api/business-partner/admin", adminBusinessPartnerRoutes);
  router.use("/api/business-partner/partner", customerBusinessPartnerRoutes);
  router.use(
    "/api/business-partner-depot/partner",
    customerBusinessPartnerDepotRoutes
  );

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`App is running on port ${config.server.port}!`)
    );
};

const init = async () => {
  /** Connect to Mongo */
  try {
    await mongoose.connect(config.mongo.url, {
      retryWrites: true,
      w: "majority",
      dbName: process.env.MONGO_DB_NAME || "test",
    });

    //** Check mongo db connection */
    const database = mongoose.connection;
    database.on(
      "error",
      Logging.error.bind(console, "❌ mongodb connection error")
    );
    database.once("open", () =>
      Logging.info("✅ mongodb connected successfully")
    );

    Logging.info("Connected to mongoDB");
    StartServer();
  } catch (error) {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  }
};

init();
