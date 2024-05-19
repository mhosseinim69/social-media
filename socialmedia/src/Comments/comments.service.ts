import { PrismaService } from "../prisma.service";
import { Comment } from "./comments.model";
import { Injectable } from "@nestjs/common";
import { PaginationDto } from '../Comments/dto/pagination.dto';
import { CreateCommentDto } from "./dto/create.comment.dto";

@Injectable()
export class CommentsService {

    constructor(private prisma: PrismaService) { }

    async createComment(data: CreateCommentDto, user: string): Promise<any> {
        return this.prisma.comment.create({
            data: {
                content: data.content,
                postId: data.postId,
                user,
            },
            include: {
                post: true,
            },
        });
    }


    async updateComment(id: number, data: CreateCommentDto, user: string): Promise<Comment> {

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


    async getAllComments(paginationDto: PaginationDto): Promise<Comment[]> {

        const { page = 1, pagesize = 10 } = paginationDto;
        const skip = (page - 1) * pagesize;
        const take = Number(pagesize);

        return this.prisma.comment.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        })
    }


    async getCommentById(id: number): Promise<Comment> {
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