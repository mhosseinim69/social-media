import { PrismaService } from "../prisma.service";
import { Post } from "./posts.model";
import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { PaginationDto } from '../Posts/dto/pagination.dto';
import { CreatePostDto } from './dto/create.post.dto';

@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) { }

    async createPost(data: CreatePostDto, author: number): Promise<Post> {
        return this.prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                author,
                tags: data.tags,
                article: data.article,
                totalViews: 0,
            }
        });
    }


    async updatePost(id: number, data: CreatePostDto, author: number): Promise<Post> {

        const idToUpdate = Number(id);

        return this.prisma.post.update({
            where: { id: idToUpdate },
            data: {
                title: data.title,
                description: data.description,
                author,
                tags: data.tags,
                article: data.article,
            }
        });
    }


    async getAllPosts(paginationDto: PaginationDto): Promise<Post[]> {

        const { page = 1, pagesize = 10 } = paginationDto;
        const skip = (page - 1) * pagesize;
        const take = Number(pagesize);

        return this.prisma.post.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        })
    }


    async getPostById(id: number): Promise<any> {

        const idToGet = Number(id);

        const post = await this.prisma.post.findUnique({
            where: {
                id: idToGet,
            },
            include: {
                comments: {
                    select: {
                        id: true,
                    },
                },
            },
        });



        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        const totalComments = post.comments.length;

        const postWithTotalViews = await this.prisma.post.update({
            where: { id: idToGet },
            include: {
                comments: true
            },
            data: { totalViews: post.totalViews + 1 },
        });

        return { ...postWithTotalViews, totalComments };
    }


    async deletePost(id: number): Promise<any> {
        const idToGet = Number(id);
        return this.prisma.post.delete({
            where: {
                id: idToGet
            }
        })
    }
}