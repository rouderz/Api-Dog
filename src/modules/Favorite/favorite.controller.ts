import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";

@Controller("Favorite")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {
  }

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.favoriteService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

}
