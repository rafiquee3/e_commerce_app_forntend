import NextAuth from "next-auth"
import { User as UserModel } from '@prisma/client';

declare module 'next-auth' {
  interface User extends UserModel {
    id: number; // <- here it is
  }
}