import { Prisma } from "@prisma/client";

export class Comments implements Prisma.CommentUncheckedCreateInput {
    user: string
    content: string
    createdAt?: Date
    updatedAt?: Date
    postId: number
} 