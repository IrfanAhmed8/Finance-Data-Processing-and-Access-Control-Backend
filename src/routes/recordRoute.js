import express from "express";
import { createRecord, getRecords ,deleteRecord,updateRecord,filterRecordsByCategory,filterRecordsByType,filterRecordByTypeAndCategory} from "../controllers/recordController.js";
import { authorizeRoles } from "../middleware/AuthorizeRoles.js";
const router = express.Router();

router.post("/", authorizeRoles("admin"), createRecord);
router.get("/", authorizeRoles("admin", "analyst", "viewer"), getRecords);
router.patch("/:id", authorizeRoles("admin"), updateRecord);
router.delete("/:id", authorizeRoles("admin"), deleteRecord);
router.get("/category", authorizeRoles("admin", "analyst", "viewer"), filterRecordsByCategory);
router.get("/type", authorizeRoles("admin", "analyst", "viewer"), filterRecordsByType);
router.get("/type-category", authorizeRoles("admin", "analyst", "viewer"), filterRecordByTypeAndCategory);
export default router;