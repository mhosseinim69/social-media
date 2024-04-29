import { IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
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
    password: string;
}