import { Controller, Get, Post, Delete, Body, Param, Req, Res, NotFoundException, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Request, Response } from 'express'
import { CreatePostDto } from "./dto/create.post.dto";
import { UpdatePostDto } from "./dto/update.post.dto";
import { JwtAuthGuard } from "../authentication/auth.guard";
import {
    ApiBearerAuth,
    ApiBody,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';


@ApiTags('posts')
@Controller('posts')


export class PostsController {
    constructor(private readonly postService: PostsService) { }


    @ApiCreatedResponse({ description: "Post was created" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: CreatePostDto,
    })
    @Post()
    @UseGuards(JwtAuthGuard)

    async createPost(@Body() createPostDto: CreatePostDto, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {

            const article = request.user['id'];
            const newPost = await this.postService.createPost(createPostDto, article);
            return response.status(HttpStatus.CREATED).json({
                status: 'Created!',
                message: 'Post created successfully!',
                result: newPost
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
    @ApiOkResponse({ description: "Post was updated" })
    @ApiBearerAuth('access-token')
    @ApiBody({
        type: UpdatePostDto,
    })

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Res() response: Response, @Req() request: Request): Promise<any> {
        try {
            const article = request.user['id'];
            const updatedPost = await this.postService.updatePost(id, updatePostDto, article);
            if (!updatedPost) {
                throw new NotFoundException(`Post with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Post updated successfully!',
                result: updatedPost
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
    @ApiOkResponse({ description: "Get all posts" })
    async getAllPosts(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const posts = await this.postService.getAllPost();
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: posts
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
    @ApiOkResponse({ description: "Get post" })
    async getPostById(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const post = await this.postService.getPostById(id);
            if (!post) {
                throw new NotFoundException(`Post with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch post!',
                result: post
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
    @ApiOkResponse({ description: "Post was deleted" })
    async deletePost(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const deletedPost = await this.postService.deletePost(id);
            if (!deletedPost) {
                throw new NotFoundException(`Post with ID ${id} not found`);
            }
            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Post deleted successfully!',
                result: deletedPost
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