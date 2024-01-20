import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";
import { cityListController } from "../controllers/cityListController";

const router = Router();

router.get('/', homeController);
router.get('/check', checkController);
router.get('/weather', weatherController);
router.get('/cities', cityListController);


export default router;