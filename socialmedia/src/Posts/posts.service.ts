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


    // async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Categories> {

    //     const idToUpdate = Number(id);

    //     const category = await this.prisma.categories.findUnique({
    //         where: {
    //             id: idToUpdate
    //         }
    //     })

    //     const updatedData: Partial<Categories> = {};

    //     if (updateCategoryDto.name !== undefined) {
    //         updatedData.name = updateCategoryDto.name;
    //     }
    //     if (updateCategoryDto.score !== undefined) {
    //         updatedData.score = updateCategoryDto.score;
    //     }

    //     if (updateCategoryDto.action) {
    //         updatedData.name = category.name
    //         switch (updateCategoryDto.action) {

    //             case "increment":
    //                 updatedData.score = category.score + 1;
    //                 break;
    //             case "decrement":
    //                 updatedData.score = category.score - 1;
    //                 break;
    //             default:
    //                 break;

    //         }
    //     }

    //     return this.prisma.categories.update({
    //         where: { id: idToUpdate },
    //         data: updatedData
    //     });
    // }


    // async getAllCategory(): Promise<Categories[]> {

    //     return this.prisma.categories.findMany()
    // }


    // async getCategoryById(id: number): Promise<Categories> {
    //     const idToGet = Number(id);

    //     return this.prisma.categories.findUnique({
    //         where: {
    //             id: idToGet
    //         }
    //     })
    // }


    // async deleteCategory(id: number): Promise<any> {
    //     const idToGet = Number(id);
    //     return this.prisma.categories.delete({
    //         where: {
    //             id: idToGet
    //         }
    //     })
    // }
}