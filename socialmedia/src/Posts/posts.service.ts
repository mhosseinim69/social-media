import { PrismaService } from "../prisma.service";
import { Posts } from "./posts.model";
import { ConflictException, Injectable } from "@nestjs/common";
import { UpdatePostDto } from "./dto/update.post.dto"



@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) { }

    async createPost(data: Posts, article: number): Promise<Posts> {
        return this.prisma.posts.create({
            data: {
                title: data.title,
                description: data.description,
                article,
                tags: data.tags
            }
        });
    }


    async updatePost(id: number, data: Posts, article: number): Promise<Posts> {

        const idToUpdate = Number(id);

        return this.prisma.posts.update({
            where: { id: idToUpdate },
            data: {
                title: data.title,
                description: data.description,
                article,
                tags: data.tags
            }
        });
    }


    async getAllPost(): Promise<Posts[]> {

        return this.prisma.posts.findMany()
    }


    async getPostById(id: number): Promise<Posts> {
        const idToGet = Number(id);

        return this.prisma.posts.findUnique({
            where: {
                id: idToGet
            }
        })
    }


    async deletePost(id: number): Promise<any> {
        const idToGet = Number(id);
        return this.prisma.posts.delete({
            where: {
                id: idToGet
            }
        })
    }
}