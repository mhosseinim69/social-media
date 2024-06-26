import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CommentsController } from "../Comments/comments.controller";
import { CommentsService } from "../Comments/comments.service";
import { PostsService } from "../Posts/posts.service";
import { UsersService } from "../Users/users.service";
import { ProducerService } from "../queues/producer.service";

@Module({
    controllers: [CommentsController],
    providers: [CommentsService, PrismaService, PostsService, UsersService, ProducerService]
})
export class CommentsModule { }