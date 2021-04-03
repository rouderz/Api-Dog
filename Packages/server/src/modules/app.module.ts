import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Users } from "./users/entities/user.entity";
import { AuthService } from "./auth/auth.service";
import { UsersService } from "./users/users.service";
import { FavoriteModule } from './Favorite/favorite.module';
import { FavoriteService } from "./Favorite/favorite.service";
import { Favorite } from "./Favorite/entities/favorite.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.APP_DBHOST,
      port: 3306,
      username: process.env.APP_DBUSERNAME,
      password: process.env.APP_DBPASSWORD,
      database: process.env.APP_DBNAME,
      entities: [Users, Favorite],
      synchronize: false
    }),
    AuthModule,
    UsersModule,
    FavoriteModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, FavoriteService]
})
export class AppModule {
}
