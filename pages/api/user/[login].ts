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

        const login: string = req.query.login;
        const sessionLogin: string = session.user?.login;
        const user = await prisma.user.findUnique({
            where: {
            login,
            },
        });
        console.log('user zz', session)
        if (sessionLogin !== login) {
            throw new Error('Dostęp nieupowaznionym osoba zabroniony');
        }
        if (!user) {
            throw new Error('Nie ma takiego uzytkownika');
        }
        res.status(200).json(user);
    } catch (err: any) {
        res.json({"error": err.message})
    }
}