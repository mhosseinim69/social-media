import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
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
            const result = await this.userService.getAllUser();
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
}