import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";
import { cityListController } from "../controllers/cityListController";
import { cityEventDetailsController, cityEventListController, citySearchEventListController } from "../controllers/cityEventsController";
import { periodListController } from "../controllers/periodListController";

const router = Router();

router.get('/', homeController);
router.get('/check', checkController);
router.get('/weather', weatherController);
router.get('/cities', cityListController);
router.get('/events', cityEventListController);
router.get('/events/search', citySearchEventListController);
router.get('/event', cityEventDetailsController);
router.get('/periods', periodListController);


export default router;