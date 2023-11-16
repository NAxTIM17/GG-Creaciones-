import { Router } from "express";
import Handlers from "../handlers/index.js";

const router = Router();

router.get('/api/sales', Handlers.Sales.Get);
router.get('/api/sales/:id', Handlers.Sales.Get);
router.post('/api/sales', Handlers.Sales.Post);
router.patch('/api/sales/:id', Handlers.Sales.Patch);
router.delete('/api/sales/:id', Handlers.Sales.Delete);

export default router;
