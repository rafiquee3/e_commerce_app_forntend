import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const products: ProductType[] = await prisma.product.findMany();

        if (!products) {
            throw new Error('There are no products');
        }
        res.status(200).json(products);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}