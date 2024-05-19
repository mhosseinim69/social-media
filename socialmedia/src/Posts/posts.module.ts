import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PostsController } from "../Posts/posts.controller";
import { PostsService } from "../Posts/posts.service";
import { PostsResolver } from '../Posts/posts.resolver';

@Module({
    controllers: [PostsController],
    providers: [PostsService, PrismaService, PostsResolver]
})
export class PostsModule { }