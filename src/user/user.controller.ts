import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(Number(id))
    return user
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto)
    return newUser
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.userService.deleteById(Number(id))
    return user
  }
}
