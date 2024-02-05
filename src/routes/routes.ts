import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";
import { cityListController } from "../controllers/cityListController";
import { cityEventDetailsController, cityEventListController } from "../controllers/cityEventsController";

const router = Router();

router.get('/', homeController);
router.get('/check', checkController);
router.get('/weather', weatherController);
router.get('/cities', cityListController);
router.get('/events', cityEventListController);
router.get('/event', cityEventDetailsController);


export default router;