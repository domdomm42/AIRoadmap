import { RequestHandler, Router } from "express";
import {
  handleSetupGoal,
  handleFollowUp,
  handleCreateHowUltralearningPlan,
  handleCreateStudyPlan,
} from "../controller/resourceController";

const router = Router();

router.post("/setupGoal", handleSetupGoal as RequestHandler);
router.post("/followup", handleFollowUp as RequestHandler);
router.post("/howPlan", handleCreateHowUltralearningPlan as RequestHandler);
router.post("/studyPlan", handleCreateStudyPlan as RequestHandler);

export default router;
