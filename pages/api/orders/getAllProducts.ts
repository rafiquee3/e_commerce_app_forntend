import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return;
    }
    try {
        const session = await getSession({req});
        if (!session) {
            return res.status(401).send('Musisz być zalogowany');
        }
        const orders = await prisma.order.findMany({
            where: {
                authorLogin: session.user.login,
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