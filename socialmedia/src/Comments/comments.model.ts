import { Prisma } from "@prisma/client";

export class Comment implements Prisma.CommentUncheckedCreateInput {
    user: string
    content: string
    createdAt?: Date
    updatedAt?: Date
    postId: number
} 