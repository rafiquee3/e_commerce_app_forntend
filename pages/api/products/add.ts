import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const data: ProductType = req.body;
        console.log(data)
        if (!data) {
            throw new Error('Error...');
        }
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.slug,
                category: data.category,
                image: data.image,
                price: data.price,
                brand: data.brand,
                rating: data.rating,
                numReviews: data.numReviews,
                countInStock: data.countInStock,
                description: data.description,
                isFeatured: data.isFeatured
              },
            });
        if (!product) {
            throw new Error('Error...');
        }
        res.status(200).json(product);
        } catch (error) {   
         res.json({"error": error})
        }
}
