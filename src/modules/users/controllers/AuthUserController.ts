import { Request, Response } from 'express';
import AuthUserService from '../services/AuthUserService';

class AuthUserController {

    async handle(req: Request, res: Response){
        const { email,password } = req.body;

        const auth = await AuthUserService.execute({
            email,
            password
        }); 

        return res.json(auth);
    }   
}

export default new AuthUserController();