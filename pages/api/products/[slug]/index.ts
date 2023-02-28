import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse//<ProductType>
) {
    if (req.method !== 'GET') {
        return;
    }
    try {
        const slug: any = req.query.slug;
        const product = await prisma.product.findUnique({
            where: {
            slug,
            },
        });

        if (!product) {
            throw new Error('The product with the given name does not exist');
        }
        res.status(200).json(product);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}