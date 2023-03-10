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

        if (token?.login === 'admin') {
            const order = await prisma.order.delete({
                where: {
                    id
                },
            });
            return res.status(200).json(order);
        } else {
            throw new Error('Opcja dostępna tylko dla administratora');
        }
        
    } catch (err: any) {
        res.json({"error": err.message})
    }
}