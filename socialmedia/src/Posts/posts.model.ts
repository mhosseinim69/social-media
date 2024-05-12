import { Prisma } from "@prisma/client";

export class Post implements Prisma.PostCreateInput {
    title: string
    description: string
    author: number
    article?: string
    tags?: string
    totalViews: number
    createdAt?: Date
    updatedAt?: Date
} 