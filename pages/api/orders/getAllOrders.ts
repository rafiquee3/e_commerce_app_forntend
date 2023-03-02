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
    const login = req.body.login;
    if (req.method !== 'POST') {
        return;
    }
    
    try {
        if (!token?.login) {
            throw new Error('Musisz być zalogowany');
        }
        const orders = await prisma.order.findMany({
            where: {
                authorLogin: login,
            }
        });
        if (!orders) {
            throw new Error('Brak zamówień');
        }
        res.status(200).json(orders);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}