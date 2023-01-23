import { ProductType } from '@/components/Product/ProductItem.component'
import { prisma } from '@/prisma/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
        res.status(200).json(req.body)
}