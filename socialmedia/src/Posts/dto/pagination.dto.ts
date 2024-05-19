import { IsOptional, IsPositive, Min } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Field(() => Int, { nullable: true })
    page?: number;

    @IsOptional()
    @IsPositive()
    @Min(1)
    @Field(() => Int, { nullable: true })
    pagesize?: number;
}