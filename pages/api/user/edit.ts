import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse//<ProductType>
) {
    if (req.method !== 'PUT') {
        return;
    }
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token?.login) {
        throw new Error('Brak dostępu');
    }
    try {
        const data = req.body;
        const updatedUser = await prisma.user.update({
            where: {
              id: data.id
            },
            data: {
              login: data.login,
              email: data.email,
              name: data.name,
              surname: data.surname,
            },
          })

        if (!updatedUser) {
            throw new Error('User with the given id does not exist');
        }
        res.status(200).json(updatedUser);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}