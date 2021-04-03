import { IsEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {

  @IsEmpty()
  @IsString()
  id_user: string;

  @IsEmpty()
  @IsString()
  favorite: string;

}
