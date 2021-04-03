import { Module } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";
import { UsersService } from "../users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entities/favorite.entity";
import { Users } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Users])],
  controllers: [FavoriteController],
  providers: [FavoriteService, UsersService],
  exports: [TypeOrmModule]
})
export class FavoriteModule {
}
