import { Controller, Get, Param, Req, Res, UseGuards, HttpStatus, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from 'express'
import { JwtAuthGuard } from "../authentication/auth.guard";
import {
    ApiBearerAuth,
    ApiTags,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOkResponse({ description: "Get all users" })
    @ApiUnauthorizedResponse({ description: "invalid credentials" })

    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {

        let result = {}

        try {
            result = await this.userService.getAllUsers();
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }

        return response.status(200).json({
            status: 'Ok!',
            message: 'Successfully fetch data!',
            result: result
        })
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get user" })
    async getUserById(@Param('id') id: number, @Res() response: Response): Promise<any> {

        let user = {}

        try {
            user = await this.userService.getUserById(id);
        } catch (e) {
            if (e instanceof BadRequestException) {
                let error = e.getResponse()
                return response.status(e.getStatus()).json(error);
            }
        }
        return response.status(HttpStatus.OK).json({
            status: 'Ok!',
            message: 'Successfully fetch post!',
            result: user
        });
    }
}