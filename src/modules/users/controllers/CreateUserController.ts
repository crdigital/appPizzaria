import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class CreateUserController {

    async handle(req: Request, res: Response){
        const {name, email, password} = req.body;

        const createUserservice = CreateUserService;

        const user = await createUserservice.execute({name,email,password});
        
        return res.json(user);
    }
}

export default new CreateUserController();