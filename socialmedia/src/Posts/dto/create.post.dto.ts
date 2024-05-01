import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreatePostDto {

    @ApiProperty({
        example: 'programming',
        required: true
    })
    @IsString()
    title: string;


    @ApiProperty({
        example: 'node.js is framework javascript',
        required: true
    })
    @IsString()
    description: string;


    @ApiProperty({
        example: '@ali',
        required: false
    })
    @IsString()
    tags: string;


    @ApiProperty({
        example: 'node',
        required: false
    })
    @IsString()
    article: string;


    author: number;
    totalViews: number;

}