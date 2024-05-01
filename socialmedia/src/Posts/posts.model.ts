import { Prisma } from "@prisma/client";

export class Posts implements Prisma.PostCreateInput {
    title: string
    description: string
    author: number
    article?: string
    tags?: string
    totalViews: number
    createdAt?: Date
    updatedAt?: Date
} 