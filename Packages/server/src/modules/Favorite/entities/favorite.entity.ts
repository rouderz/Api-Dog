import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  id_user: string;

  @Column()
  favorite: string;


}
