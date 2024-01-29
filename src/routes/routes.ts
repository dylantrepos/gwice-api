import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";
import { cityListController } from "../controllers/cityListController";
import { culturalEventsController } from "../controllers/culturalEventsController";

const router = Router();

router.get('/', homeController);
router.get('/check', checkController);
router.get('/weather', weatherController);
router.get('/cities', cityListController);
router.get('/events/cultural', culturalEventsController);


export default router;