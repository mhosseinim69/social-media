import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create.post.dto';
import { PaginationDto } from './dto/pagination.dto';

@Resolver(() => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) { }

    @Query(() => [Post])
    async getPosts(
        @Args('paginationDto', { type: () => PaginationDto, nullable: true }) paginationDto?: PaginationDto
    ): Promise<Post[]> {
        return this.postsService.getAllPosts(paginationDto);
    }

    @Query(() => Post)
    async getPostById(@Args('id', { type: () => Int }) id: number): Promise<Post> {
        return this.postsService.getPostById(id);
    }

    @Mutation(() => Post)
    async createPost(
        @Args('createPostDto', { type: () => CreatePostDto }) createPostDto: CreatePostDto,
        @Args('author', { type: () => Int }) author: number
    ): Promise<Post> {
        return this.postsService.createPost(createPostDto, author);
    }

    @Mutation(() => Post)
    async updatePost(
        @Args('id', { type: () => Int }) id: number,
        @Args('updatePostDto', { type: () => CreatePostDto }) updatePostDto: CreatePostDto,
        @Args('author', { type: () => Int }) author: number
    ): Promise<Post> {
        return this.postsService.updatePost(id, updatePostDto, author);
    }

    @Mutation(() => Post)
    async deletePost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
        return this.postsService.deletePost(id);
    }
}