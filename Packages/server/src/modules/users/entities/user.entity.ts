import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_At: Date;

  @Column()
  update_At: Date;

}
