import { Router } from "express";
import Handlers from "../handlers/index.js";

const router = Router();

router.get('/api/stats/year', Handlers.Stats.GetByYear);
router.get('/api/stats/month', Handlers.Stats.GetByMonth);
router.get('/api/stats/day', Handlers.Stats.GetByDay);

export default router;
