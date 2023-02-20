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
        const id: number = Number(req.query.id);
        const order = await prisma.order.findUnique({
            where: {
                id: id,
            },
        });

        if (!order) {
            throw new Error('Zamówienie o podanym numerze id nie istnieje');
        }
        if (order.authorLogin !== token?.login) {
            throw new Error('Brak dostępu');
        }
        res.status(200).json(order);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}