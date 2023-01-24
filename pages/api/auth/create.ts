import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs';

export type UserType = {
    login: string;
    email: string;
    hash:  string;
    name?:  string;
    surname?: string;
    refreshToken?: string;
}
type ErrorObj = {
    field: string;
    error: string;
  };
const prisma = new PrismaClient();

class CustomError extends Error {
    msg: ErrorObj[];
    constructor(msg: ErrorObj[], ...params: []) {
      super(...params);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
      this.name = "CustomError";
      this.msg = msg;
    }
}
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    async function userValidator(dto: UserType) {
        if (req.method !== 'POST') {
            return;
        }
        const errors: ErrorObj[] = [];
        const existingUser = await prisma.user.findUnique({
            where: {
              login: dto.login,
            },
          });
        const existingEmail = await prisma.user.findUnique({
        where: {
            email: dto.email,
        },
        });
        if (existingUser) {
          errors.push({
            field: 'login',
            error: 'this user already exists',
          });
        }
        if (existingEmail) {
          errors.push({
            field: 'email',
            error: 'this email has already been taken',
          });
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dto.email)) {
            errors.push({
                field: 'email',
                error: 'email incorrect',
              });
          }
        if (dto.login.length < 5)
          errors.push({
            field: 'login',
            error: 'the entered word should contain at least 5 characters',
          });
        if (dto.login.length > 13)
          errors.push({
            field: 'login',
            error: 'the entered word should contain at max 13 characters',
          });
        if (dto.hash.length < 5)
          errors.push({
            field: 'password',
            error: 'the entered password should contain at least 5 characters',
          });
        if (dto.hash.length > 13)
          errors.push({
            field: 'password',
            error: 'the entered password should contain at max 13 characters',
          });
        if (dto.login.length > 0 && dto.hash.length > 0) {
          const reg = /^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/;
    
          if (!reg.test(dto.login))
            errors.push({
              field: 'login',
              error:
                'login should consist of letters and numbers and may contain _',
            });
          if (!reg.test(dto.hash))
            errors.push({
              field: 'password',
              error:
                'password should consist of letters and numbers and may contain _',
            });
        }
        return errors;
    }
    try {
        const data: UserType = req.body;
        if (!data) {
            throw new CustomError([{
                field: 'data',
                error: 'empty data',
            }]);
        }
        const validationError: ErrorObj[] | undefined = await userValidator(data);
        if (validationError?.length) {
            throw new CustomError(validationError);
        }
        let hash = bcryptjs.hashSync(data.hash, 8);
        const user = await prisma.user.create({
            data: {
                login: data.login,
                email: data.email,
                hash: hash,
                name: data.name,
                surname: data.surname,
                refreshToken: data.refreshToken,
              },
            });
        if (!user) {
            throw new Error('Error...');
        }
        res.status(200).json({"status": "success"});
        } catch (err: any) {   
         res.json({"error": err.msg})
        }
}