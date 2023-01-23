import { ProductType } from '@/components/Product/ProductItem.component'
import { prisma } from '@/prisma/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductType>
) {
    try {
        const product = await prisma.product.findUnique({
            where: {
            slug: req.query.slug,
            },
        });
        if (!product) {
            throw new Error('The article with the given id does not exist');
        }
        res.status(200).json(product);
        } catch (error) {
        return error;
        }  
}