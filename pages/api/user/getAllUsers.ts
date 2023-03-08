import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({
        req: req,
        secret: secret,
    });
    try {
        if (!token?.login) {
            throw new Error('Musisz być zalogowany');
        }
        if (token?.login !== 'admin') {
            throw new Error('Dostępne tylko dla administratora');
        }
        const users = await prisma.user.findMany();

        if (!users) {
            throw new Error('There are no users');
        }
        res.status(200).json(users);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}