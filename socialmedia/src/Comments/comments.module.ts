import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CommentsController } from "../Comments/comments.controller";
import { CommentsService } from "../Comments/comments.service";

@Module({
    controllers: [CommentsController],
    providers: [CommentsService, PrismaService]
})
export class CommentsModule { }