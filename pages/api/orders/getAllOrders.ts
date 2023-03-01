import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getToken } from "next-auth/jwt"
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session1 = await getSession({ req }) 
    const secret = process.env.NEXTAUTH_SECRET;
    const session = await getSession({ req });
    const token = await getToken({
        req: req,
        secret: secret,
      });
    console.log('session getSession: ', session)
    console.log('token ss: ', token)
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