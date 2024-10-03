import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @UseGuards(FirebaseAuthGuard)
  async me() {
    return 'Hello World';
  }

  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.authService.getUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    const newUser = await this.authService.createUser(
      createUserDto.email,
      createUserDto.password,
    );

    return newUser;
  }
}
