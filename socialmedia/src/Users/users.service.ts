import { PrismaService } from "../prisma.service";
import { Users } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<Users[]> {
        return this.prisma.user.findMany()
    }


    async createUser(data: Users): Promise<Users> {
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


    async getUserById(id: number): Promise<Users> {
        const idToGet = Number(id);

        return this.prisma.user.findUnique({
            where: {
                id: idToGet
            }
        })
    }
}