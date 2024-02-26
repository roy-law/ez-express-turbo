import express from "express";

import { checkJwt, checkAuthHealthCheckScope } from "../middleware/auth";

const router = express.Router();

// This route doesn't need authentication
router.get("/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
router.get("/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

// This route needs authentication and authorization
router.get(
  "/private-scoped",
  checkJwt,
  checkAuthHealthCheckScope,
  function (req, res) {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

export default router;
