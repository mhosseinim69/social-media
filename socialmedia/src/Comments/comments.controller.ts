import { Controller, Get, Post, Delete, Body, Param, Req, Res, NotFoundException, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Request, Response } from 'express'
import { CreateCommentDto } from "./dto/create.comment.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
import { JwtAuthGuard } from "../authentication/auth.guard";
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
    constructor(private readonly commentService: CommentsService) { }


    @ApiCreatedResponse({ description: "Comment was created" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: CreateCommentDto,
    })
    @Post()
    @UseGuards(JwtAuthGuard)

    async createComment(@Body() createCommentDto: CreateCommentDto, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {

            const user = request.user['username'];
            const newComment = await this.commentService.createComment(createCommentDto, user);
            return response.status(HttpStatus.CREATED).json({
                status: 'Created!',
                message: 'Comment created successfully!',
                result: newComment
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
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
        try {
            const user = request.user['username'];
            const updatedComment = await this.commentService.updateComment(id, updateCommentDto, user);
            if (!updatedComment) {
                throw new NotFoundException(`Comment with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Post updated successfully!',
                result: updatedComment
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get all comments" })
    async getAllComments(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const comments = await this.commentService.getAllComments();
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: comments
            })
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Ok!',
                message: 'Internal Server Error!'
            })
        }
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get comment" })
    async getCommentById(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const comment = await this.commentService.getCommentById(id);
            if (!comment) {
                throw new NotFoundException(`Comment with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch post!',
                result: comment
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Comment was deleted" })
    async deleteComment(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const deletedComment = await this.commentService.deleteComment(id);
            if (!deletedComment) {
                throw new NotFoundException(`Comment with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Post deleted successfully!',
                result: deletedComment
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }
}