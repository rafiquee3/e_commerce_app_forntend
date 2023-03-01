import { ProductType } from '@/components/Product/ProductItem.component'
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
        const slug: any = req.query.slug;
        const product = await prisma.product.findUnique({
            where: {
              slug
            },
          })
        console.log('produccik:', product)
        const updateProduct = await prisma.product.update({
            where: {
              slug
            },
            data: {
              countInStock: (product) ?  (product.countInStock - req.body.quantity) : 0,
            },
          })

        if (!updateProduct) {
            throw new Error('The product with the given name does not exist');
        }
        res.status(200).json(updateProduct);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}