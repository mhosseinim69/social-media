import { Controller, Get, Post, Delete, Body, Param, Req, Res, Query, NotFoundException, HttpStatus, Put, UseGuards, Logger, BadRequestException } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Request, Response } from 'express'
import { CreatePostDto } from "./dto/create.post.dto";
import { UpdatePostDto } from "./dto/update.post.dto";
import { JwtAuthGuard } from "../authentication/auth.guard";
import { PaginationDto } from '../Posts/dto/pagination.dto';
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

    private readonly logger = new Logger(PostsController.name);

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

        const author = request.user['id'];
        let tatalViews = 0
        let newPost = {}

        try {
            newPost = await this.postService.createPost(createPostDto, author, tatalViews);
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }

        this.logger.log(`Post created successfully by user ${author}`);

        return response.status(HttpStatus.CREATED).json({
            status: 'Created!',
            message: 'Post created successfully!',
            result: newPost
        });
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

        const author = request.user['id'];
        let tatalViews = 0
        let updatedPost = {}

        try {
            const updatedPost = await this.postService.updatePost(id, updatePostDto, author, tatalViews);
            if (!updatedPost) {
                throw new NotFoundException(`Post with ID ${id} not found`);
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
            result: updatedPost
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get all posts" })
    async getAllPosts(@Req() request: Request, @Res() response: Response, @Query() paginationDto: PaginationDto): Promise<any> {

        let posts = {}

        try {
            posts = await this.postService.getAllPosts(paginationDto);
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }

        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Successfully fetch data!',
            result: posts
        })
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get post" })
    async getPostById(@Param('id') id: number, @Res() response: Response): Promise<any> {

        let post = {}

        try {
            post = await this.postService.getPostById(id);
        } catch (e) {
            if (e instanceof NotFoundException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }

        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Successfully fetch post!',
            result: post
        });
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Post was deleted" })
    async deletePost(@Param('id') id: number, @Res() response: Response): Promise<any> {

        let deletedPost = {}

        try {
            const deletedPost = await this.postService.deletePost(id);
            if (!deletedPost) {
                throw new NotFoundException(`Post with ID ${id} not found`);
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
            result: deletedPost
        });
    }
}