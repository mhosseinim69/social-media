import { Controller, Post, Body, Req, Res, NotFoundException, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express'
import { RegisterUsersDto } from "./dto/register-user.dto";
import {
    ApiBody,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @ApiOkResponse({ description: "User Login" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiBody({
        type: LoginDto,
    })
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {

        let result = {}
        try {
            result = await this.authService.login(loginDto);
        } catch (e) {
            if (e instanceof NotFoundException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }
        return response.status(200).json({
            status: 'Ok!',
            message: 'Successfully login!',
            result: result
        })
    }


    @Post('/register')
    @ApiCreatedResponse({ description: "User Registration" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiBody({
        type: RegisterUsersDto,
    })
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {

        let result = {}
        try {
            result = await this.authService.register(registerDto);
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }
        return response.status(200).json({
            status: 'Ok!',
            message: 'Successfully register user!',
            result: result,
        });
    }
}