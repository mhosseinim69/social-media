import { Controller, Get, Param, Req, Res, UseGuards, HttpStatus } from "@nestjs/common";
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
        try {
            const result = await this.userService.getAllUsers();
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            })
        } catch (err) {
            return response.status(500).json({
                status: 'Ok!',
                message: 'Internal Server Error!'
            })
        }
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiUnauthorizedResponse({ description: "invalid credentials" })
    @ApiOkResponse({ description: "Get user" })
    async getUserById(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const user = await this.userService.getUserById(id);

            return response.status(HttpStatus.OK).json({
                status: 'Ok!',
                message: 'Successfully fetch post!',
                result: user
            });
        } catch (err) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Error',
                message: 'Internal Server Error!',
                error: err.message
            });
        }
    }



}