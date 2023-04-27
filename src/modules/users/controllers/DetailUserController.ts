import { Request, Response } from 'express';
import DetailUserService from '../services/DetailUserService';

class DetailUserController {
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        // console.log("ID do usuário: ", user_id);

        const detailUserService = await DetailUserService.execute(user_id);

        return res.json(detailUserService);
    }
}

export default new DetailUserController();