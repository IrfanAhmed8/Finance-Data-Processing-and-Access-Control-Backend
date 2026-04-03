import { getSummary } from "../services/summaryService.js";
import { authorizeRoles } from "../middleware/AuthorizeRoles.js";
import express from "express";
export const fetchSummary = async (req, res) => {
  const data = await getSummary();
  res.json(data);
};
const router = express.Router();
router.get("/", authorizeRoles("analyst"), fetchSummary);
export default router;