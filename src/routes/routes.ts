import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";

// export const routerApp = (app: Application) => {

//   app.get('/', (_: Request, res: Response) => res.send({ 
//     message: 'Hello World!'
//   })); 

//   app.get('/check', checkController); 
// }

const router = Router();

router.get('/', homeController);
router.get('/check', checkController);
router.get('/:city/weather', weatherController);


export default router;