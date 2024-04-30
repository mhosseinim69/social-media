import { PrismaService } from "../prisma.service";
import { Posts } from "./posts.model";
import { ConflictException, Injectable } from "@nestjs/common";
import { UpdatePostDto } from "./dto/update.post.dto"
import { NotFoundException } from "@nestjs/common";



@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) { }

    async createPost(data: Posts, article: number, totalViews: number): Promise<Posts> {
        return this.prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                article,
                tags: data.tags,
                totalViews,
            }
        });
    }


    async updatePost(id: number, data: Posts, article: number, totalViews: number): Promise<Posts> {

        const idToUpdate = Number(id);

        return this.prisma.post.update({
            where: { id: idToUpdate },
            data: {
                title: data.title,
                description: data.description,
                article,
                tags: data.tags,
                totalViews,
            }
        });
    }


    async getAllPosts(): Promise<Posts[]> {

        return this.prisma.post.findMany()
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