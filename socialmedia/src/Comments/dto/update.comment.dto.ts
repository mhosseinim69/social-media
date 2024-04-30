import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class UpdateCommentDto {

    @ApiProperty({
        example: 'it is a good post',
        required: true
    })
    @IsString()
    content: string;


    @ApiProperty({
        example: 1,
        required: true
    })
    @IsString()
    postId: number;

    user: string;

}