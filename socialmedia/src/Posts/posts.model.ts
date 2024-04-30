import { Prisma } from "@prisma/client";

export class Posts implements Prisma.PostCreateInput {
    title: string
    description: string
    article: number
    tags?: string
    totalViews: number
    createdAt?: Date
    updatedAt?: Date
} 