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
        const id: number = Number(req.query.id);
        const order = await prisma.order.findUnique({
            where: {
            id: id,
            },
        });

        if (!order) {
            throw new Error('Zamówienie o podanym numerze id nie istnieje');
        }
        if (order.authorLogin !== session.user.login) {
            throw new Error('Brak dostępu...');
        }
        res.status(200).json(order);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}