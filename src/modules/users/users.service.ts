import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "../auth/dto/RegisterDto";
import { getHash } from "../util/bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {
  }

  findByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        email
      }
    });
  }

  create(data: RegisterDto): Promise<Users> {
    return this.usersRepository
      .findOne({
        where: {
          email: data.email
        }
      })
      .then((user) => {
        if (user) {
          throw new ConflictException(
            `El usuario con el email: ${data.email} ya existe.`
          );
        }

        return getHash(data.password).then((hashedPassword) => {
          const userEntity = this.usersRepository.create({
            ...data,
            password: hashedPassword
          });

          return this.usersRepository.save(userEntity);
        });
      });
  }


}
