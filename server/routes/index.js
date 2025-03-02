import { Router } from "express";
import passport from "passport";
import TransactionsApi from "./TransactionsApi.js";
import AuthApi from "./AuthApi.js";
import UserApi from "./UserApi.js";

const router = Router();

// Define routes
router.use("/transaction", TransactionsApi);
router.use("/auth", AuthApi);
router.use("/user", UserApi);

// Error handling for routes
router.use((err, req, res, next) => {
  console.error('Route Error:', err);
  res.status(500).json({ message: err.message || "Route error occurred" });
});

export default router;