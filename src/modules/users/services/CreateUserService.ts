import prismaClient from '../../../prisma';
import bcrypt from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        // verificar se enviou email
        if (!email) {
            throw new Error("Falta o e-mail");
        }

        // verificar se já está cadastrado na base de dados
        const userAlredyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlredyExists) {
            throw new Error(`Existe um usuario com o email '${email}'`);
        }

        const passHash = bcrypt.hashSync(password, 10);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passHash
            },
            select:{
                id: true,
                name: true,
                email:true
            }
        });

        return user;
    }
}

export default new CreateUserService();