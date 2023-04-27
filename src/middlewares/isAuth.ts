 import { Request, Response, NextFunction } from 'express';
 import jwt from 'jsonwebtoken';

 interface Payload {
   sub: string;
 }

 export function isAuth (req: Request, res: Response, next: NextFunction){

   // receber o token 
   const authToken = req.headers.authorization;

   if(!authToken){
      return res.status(401).end();
   }

   const [, token] = authToken.split(" ");

   try {

      // validar esse token
      const { sub } = jwt.verify(
         token,
         process.env.JWT_SECRET as string
      ) as Payload;

      req.user_id = sub;

      return next();

   } catch (error) {
      return res.status(401).end();
   }   
 }