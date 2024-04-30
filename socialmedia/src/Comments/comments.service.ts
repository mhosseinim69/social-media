import { PrismaService } from "../prisma.service";
import { Comments } from "./comments.model";
import { ConflictException, Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "./dto/update.comment.dto"



@Injectable()
export class CommentsService {

    constructor(private prisma: PrismaService) { }

    async createComment(data: Comments, user: string): Promise<Comments> {
        return this.prisma.comment.create({
            data: {
                content: data.content,
                postId: data.postId,
                user,
            }
        });
    }


    async updateComment(id: number, data: Comments, user: string): Promise<Comments> {

        const idToUpdate = Number(id);

        return this.prisma.comment.update({
            where: { id: idToUpdate },
            data: {
                content: data.content,
                postId: data.postId,
                user,
            }
        });
    }


    async getAllComments(): Promise<Comments[]> {

        return this.prisma.comment.findMany()
    }


    async getCommentById(id: number): Promise<Comments> {
        const idToGet = Number(id);

        return this.prisma.comment.findUnique({
            where: {
                id: idToGet
            }
        })
    }


    async deleteComment(id: number): Promise<any> {
        const idToGet = Number(id);
        return this.prisma.comment.delete({
            where: {
                id: idToGet
            }
        })
    }
}