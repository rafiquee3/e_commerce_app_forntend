import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export type UserType = {
    login: string;
    email: string;
    hash:  string;
    name?:  string;
    surname?: string;
    refreshToken?: string;
}
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const data: UserType = req.body;
        console.log(data)
        if (!data) {
            throw new Error('Error...');
        }
        const user = await prisma.user.create({
            data: {
                login: data.login,
                email: data.email,
                hash: data.hash,
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
         res.json({"error": err.message})
        }
}