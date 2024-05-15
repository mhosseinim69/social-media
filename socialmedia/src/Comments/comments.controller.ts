import { Controller, Get, Post, Delete, Body, Param, Req, Res, Query, NotFoundException, HttpStatus, Put, UseGuards, BadRequestException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { UsersService } from "../Users/users.service";
import { ProducerService } from "../queues/producer.service";
import { Request, Response } from 'express'
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { JwtAuthGuard } from "../authentication/auth.guard";
import { PaginationDto } from '../Comments/dto/pagination.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';


@ApiTags('comments')
@Controller('comments')


export class CommentsController {
    constructor(
        private readonly commentService: CommentsService,
        private readonly userService: UsersService,
        private producerService: ProducerService) { }


    @ApiCreatedResponse({ description: "Comment was created" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: CreateCommentDto,
    })

    @Post()
    @UseGuards(JwtAuthGuard)
    async createComment(@Body() createCommentDto: CreateCommentDto, @Res() response: Response, @Req() request: Request): Promise<any> {

        const user = request.user['username'];

        try {

            const newComment = await this.commentService.createComment(createCommentDto, user);

            const userEmail = await this.userService.getUserById(newComment.post.author);
            const to = userEmail.email
            const message = `Hello ${userEmail.username}, You have a new comment on your post.`;
            const emailData = {
                to,
                subject: 'New Comment Notification',
                text: message,
            };
            await this.producerService.addToEmailQueue(emailData);

            return response.status(HttpStatus.CREATED).json({
                status: 'Created!',
                message: 'Comment created successfully!',
                result: newComment
            });
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }
    }


    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Comment was updated" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: UpdateCommentDto,
    })

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateComment(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @Res() response: Response, @Req() request: Request): Promise<any> {

        const user = request.user['username'];
        let updatedComment = {}

        try {
            updatedComment = await this.commentService.updateComment(id, updateCommentDto, user);
            if (!updatedComment) {
                throw new NotFoundException(`Comment with ID ${id} not found`);
            }
        } catch (e) {
            if (e instanceof NotFoundException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }
        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Post updated successfully!',
            result: updatedComment
        });
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get all comments" })
    async getAllComments(@Req() request: Request, @Res() response: Response, @Query() paginationDto: PaginationDto): Promise<any> {

        let comments = {}

        try {
            comments = await this.commentService.getAllComments(paginationDto);
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }

        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Successfully fetch data!',
            result: comments
        })
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get comment" })
    async getCommentById(@Param('id') id: number, @Res() response: Response): Promise<any> {

        let comment = {}

        try {
            comment = await this.commentService.getCommentById(id);
            if (!comment) {
                throw new NotFoundException(`Comment with ID ${id} not found`);
            }
        } catch (e) {
            if (e instanceof NotFoundException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }

        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Successfully fetch post!',
            result: comment
        });
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Comment was deleted" })
    async deleteComment(@Param('id') id: number, @Res() response: Response): Promise<any> {

        let deletedComment = {}

        try {
            deletedComment = await this.commentService.deleteComment(id);
            if (!deletedComment) {
                throw new NotFoundException(`Comment with ID ${id} not found`);
            }
        } catch (e) {
            if (e instanceof NotFoundException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }
        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Post deleted successfully!',
            result: deletedComment
        });
    }
}