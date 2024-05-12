import { PrismaService } from "../prisma.service";
import { User } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }


    async createUser(data: User): Promise<User> {
        const existing = await this.prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });

        if (existing) {
            throw new ConflictException('username already exists');
        }

        return this.prisma.user.create({
            data,
        });
    }


    async getUserById(id: number): Promise<User> {
        const idToGet = Number(id);

        return this.prisma.user.findUnique({
            where: {
                id: idToGet
            }
        })
    }
}