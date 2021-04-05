import { IsString } from "class-validator";

export class CreateFavoriteDto {

  @IsString()
  id_user: string;

  @IsString()
  favorite: string;

}
