import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(Number(id))
    return user
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto)
    return newUser
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = this.usersService.deleteById(Number(id))
    return user
  }
}
