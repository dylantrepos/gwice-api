import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";

const router = Router();

router.get('/', homeController);
router.get('/check', checkController);
router.get('/:city/weather', weatherController);


export default router;