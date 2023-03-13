import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (req.method !== 'GET') {
        return;
    }
    try {
        const login: any = req.query.login;

        if (token?.login === 'admin') {
            const user = await prisma.user.delete({
                where: {
                    login
                },
            });
            return res.status(200).json(user);
        } else {
            throw new Error('Opcja dostępna tylko dla administratora');
        }
    } catch (err: any) {
        res.json({"error": err.message})
    }
}