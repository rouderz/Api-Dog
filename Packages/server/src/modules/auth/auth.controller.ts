import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes, ValidationPipe
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/RegisterDto";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/LoginDto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
  }

  @Post("login")
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const logged = await this.authService.ValidateUser(
      loginDto.email,
      loginDto.password
    );
    if (logged) {
      return this.authService.login(loginDto);
    }
    throw new ConflictException("Email o contraseña incorrectos");
  }

  @Post("register")
  async register(@Body(ValidationPipe) body: RegisterDto) {
    return { ...(await this.userService.create(body)), password: undefined };
  }
}