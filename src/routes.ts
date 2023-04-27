import { Router, Request, Response } from "express";
import CreateUserController  from './modules/users/controllers/CreateUserController'
import AuthUserController from "./modules/users/controllers/AuthUserController";
import DetailUserController from "./modules/users/controllers/DetailUserController";
import { isAuth } from "./middlewares/isAuth";

const router = Router();

router.get('/', (req: Request, res: Response) =>{
    return res.json({message: "Bem vindo a api pizzaria!"});
});

// Rotas User
router.post('/users', CreateUserController.handle);
router.post('/login', AuthUserController.handle);
router.get('/me', isAuth, DetailUserController.handle);

export { router };