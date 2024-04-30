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
    // @ApiUnauthorizedResponse({ description: "invalid credentials" })
    // @ApiOkResponse({ description: "Category was updated" })
    // @ApiBearerAuth('access-token')
    // @ApiBody({
    //     type: UpdateCategoryDto,
    // })

    // @Put(':id')
    // @UseGuards(JwtAuthGuard)
    // async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @Res() response: Response): Promise<any> {
    //     try {
    //         const updatedCategory = await this.categoryService.updateCategory(id, updateCategoryDto);
    //         if (!updatedCategory) {
    //             throw new NotFoundException(`Category with ID ${id} not found`);
    //         }
    //         return response.status(HttpStatus.OK).json({
    //             status: 'Ok!',
    //             message: 'Category updated successfully!',
    //             result: updatedCategory
    //         });
    //     } catch (err) {
    //         return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             status: 'Error',
    //             message: 'Internal Server Error!',
    //             error: err.message
    //         });
    //     }
    // }

    // @Get()
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @ApiUnauthorizedResponse({ description: "invalid credentials" })
    // @ApiOkResponse({ description: "Get all users" })
    // async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
    //     try {
    //         const result = await this.categoryService.getAllCategory();
    //         return response.status(HttpStatus.OK).json({
    //             status: 'Ok!',
    //             message: 'Successfully fetch data!',
    //             result: result
    //         })
    //     } catch (err) {
    //         return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             status: 'Ok!',
    //             message: 'Internal Server Error!'
    //         })
    //     }
    // }


    // @Get(':id')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @ApiUnauthorizedResponse({ description: "invalid credentials" })
    // @ApiOkResponse({ description: "Get user" })
    // async getCategoryById(@Param('id') id: number, @Res() response: Response): Promise<any> {
    //     try {
    //         const category = await this.categoryService.getCategoryById(id);
    //         if (!category) {
    //             throw new NotFoundException(`Category with ID ${id} not found`);
    //         }
    //         return response.status(HttpStatus.OK).json({
    //             status: 'Ok!',
    //             message: 'Successfully fetch category!',
    //             result: category
    //         });
    //     } catch (err) {
    //         return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             status: 'Error',
    //             message: 'Internal Server Error!',
    //             error: err.message
    //         });
    //     }
    // }


    // @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth('access-token')
    // @ApiUnauthorizedResponse({ description: "invalid credentials" })
    // @ApiOkResponse({ description: "User was deleted" })
    // async deleteCategory(@Param('id') id: number, @Res() response: Response): Promise<any> {
    //     try {
    //         const deletedCategory = await this.categoryService.deleteCategory(id);
    //         if (!deletedCategory) {
    //             throw new NotFoundException(`Category with ID ${id} not found`);
    //         }
    //         return response.status(HttpStatus.OK).json({
    //             status: 'Ok!',
    //             message: 'Category deleted successfully!',
    //             result: deletedCategory
    //         });
    //     } catch (err) {
    //         return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //             status: 'Error',
    //             message: 'Internal Server Error!',
    //             error: err.message
    //         });
    //     }
    // }
}