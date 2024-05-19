import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {

    @ApiProperty({
        example: 'programming',
        required: true
    })
    @IsString()
    @Field()
    title: string;

    @ApiProperty({
        example: 'node.js is framework javascript',
        required: true
    })
    @IsString()
    @Field()
    description: string;

    @ApiProperty({
        example: '@ali',
        required: false
    })
    @IsString()
    @Field({ nullable: true })
    tags: string;

    @ApiProperty({
        example: 'node',
        required: false
    })
    @IsString()
    @Field({ nullable: true })
    article: string;
}