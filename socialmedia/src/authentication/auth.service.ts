import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../Users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from "./dto/register-user.dto";
import { User } from "../Users/users.model";

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService) { }


    async login(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;

        const users = await this.prismaService.user.findUnique({
            where: { username }
        })

        if (!users) {
            throw new NotFoundException('user not found')
        }

        const validatePassword = await bcrypt.compare(password, users.password)

        if (!validatePassword) {
            throw new NotFoundException('Invalid password')
        }

        return {
            token: this.jwtService.sign({ username })
        }
    }


    async register(createDto: RegisterUsersDto): Promise<any> {
        const createUser = new User();
        createUser.name = createDto.name;
        createUser.email = createDto.email;
        createUser.username = createDto.username;
        createUser.password = await bcrypt.hash(createDto.password, 10);

        const user = await this.usersService.createUser(createUser);

        return {
            token: this.jwtService.sign({
                username: user.username,
                userId: user.id
            }),
        };
    }

}