import { Prisma } from "@prisma/client";
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => Int)
    author: number;

    @Field({ nullable: true })
    article?: string;

    @Field({ nullable: true })
    tags?: string;

    @Field(() => Int)
    totalViews: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}