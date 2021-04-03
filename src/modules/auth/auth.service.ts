import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { isMatch } from "../util/bcrypt";
import { LoginDto } from "./dto/LoginDto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersServices: UsersService,
    private jwtServices: JwtService
  ) {
  }

  async ValidateUser(username: string, password: string): Promise<any> {
    const user = await this.usersServices.findByEmail(username);
    if (user && isMatch(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersServices.findByEmail(loginDto.email);
    const payload = { ...user, password: undefined };
    return {
      access_token: this.jwtServices.sign(payload)
    };
  }

}
