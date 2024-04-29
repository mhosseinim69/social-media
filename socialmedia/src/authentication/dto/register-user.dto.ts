import { IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class RegisterUsersDto {
    @ApiProperty({
        example: 'ali',
        required: true
    })
    @IsString()
    @Length(5, 10)
    username: string;
    @ApiProperty({
        example: '1234abcd',
        required: true
    })
    @IsString()
    @Length(6, 12)
    password: string
    @ApiProperty({
        example: 'ali_main',
        required: true
    })
    @IsString()
    @Length(5, 10)
    name: string
    @ApiProperty({
        example: 'ali@gmail.com',
        required: true
    })
    @IsString()
    @Length(5, 10)
    email: string
}