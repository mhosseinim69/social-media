import { Prisma } from "@prisma/client";

export class Posts implements Prisma.PostsCreateInput {
    title: string
    description: string
    article: number
    tags?: string
    createdAt?: Date
    updatedAt?: Date
} 