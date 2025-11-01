import {Router} from "express"
import homeController from "./controllers/homeController.js"
import errorController from "./controllers/errorController.js"
import userController from "./controllers/userController.js"
import mythsController from "./controllers/mythsController.js"
import reportController from "./controllers/reportController.js"

const routes = Router()

//Add routes
routes.use(homeController)
routes.use('/users', userController)
routes.use('/myths', mythsController)
routes.use('/api', reportController)

routes.use(errorController)

export default routes