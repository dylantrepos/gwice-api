import { Router } from "express";
import { checkController } from "../controllers/checkController";
import {
  cityEventDetailsController,
  cityEventListController,
  citySearchEventListController,
} from "../controllers/cityEventsController";
import {
  cityEventListTestAllController,
  cityEventListTestController,
} from "../controllers/cityEventsTestController";
import { cityListController } from "../controllers/cityListController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";

const router = Router();

router.get("/", homeController);
router.get("/check", checkController);
router.get("/weather", weatherController);
router.get("/cities", cityListController);
router.get("/events", cityEventListController);
router.get("/events/search", citySearchEventListController);
router.get("/event", cityEventDetailsController);

router.get("/events-test", cityEventListTestController);
router.get("/events-all-test", cityEventListTestAllController);

export default router;
