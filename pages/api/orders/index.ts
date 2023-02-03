import { ProductType } from '@/components/Product/ProductItem.component'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export type OrderType = {
    paymentMethod: string;
    itemsPrice:     number;
    shippingPrice:  number;
    totalPrice:     number;
    name:           string;
    surname:        string;
    email:          string;
    address:        string;
    city:           string;
    postal:         string;
    telephone:      number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return;
    }
    try {
        const data = req.body;
        console.log('data: ', data)
        if (!data) {
            throw new Error('Error...');
        }
        const order = await prisma.order.create({
            data: {
                products:       data.products,
                paymentMethod:  data.paymentMethod,
                itemsPrice:     data.itemsPrice,
                shippingPrice:  data.shippingPrice,
                totalPrice:     data.totalPrice,
                name:           data.name,
                surname:        data.surname,
                email:          data.email,
                address:        data.address,
                city:           data.city,
                postal:         data.postal,
                telephone:      data.telephone
            },
        });
        console.log('order: ', order);
        if (!order) {
            throw new Error('Error...');
        }
        res.status(200).json(order);
        } catch (err: any) {   
         res.json({"error": err.message})
        }
}
