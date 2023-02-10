import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import  { getServerSession }  from "next-auth/next";
import { getToken } from "next-auth/jwt"
import { authOptions } from "./../auth/[...nextauth]"

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    console.log('session: ', session)
    console.log('token: ', token)
    const login = req.body.login;
    if (req.method !== 'POST') {
        return;
    }
    try {
        if (!login) {
            return res.status(401).send('Musisz być zalogowany');
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