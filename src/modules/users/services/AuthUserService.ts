import prismaClient from '../../../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../../helpers/apiError';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {

    async execute({email, password}: AuthRequest){
        // verificar se o email existe
        const userExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!userExists){
            throw new Error("e-mail ou senha incorretos.");
        }

        // verificar se a senha está correta
        const comparePasswords = bcrypt.compareSync(password, userExists.password);

        if(!comparePasswords){
            throw new ApiError("e-mail ou senha incorretos.", 400);
        }

        // gerar um token jwt e devolver os dados do usuário
        const token = jwt.sign(
            {
                name: userExists.name,
                email: userExists.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: userExists.id,
                expiresIn: '30d'
            }
        );

        return {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            token: token
        }
    }
}

export default new AuthUserService();