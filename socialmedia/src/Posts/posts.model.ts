import { Prisma } from "@prisma/client";

export class Posts implements Prisma.PostCreateInput {
    title: string
    description: string
    article: number
    tags?: string
    createdAt?: Date
    updatedAt?: Date
} 