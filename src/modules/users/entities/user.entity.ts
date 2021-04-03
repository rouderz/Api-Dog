import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { strict } from "assert";

@ObjectType()
@Entity()
export class Users {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  first_name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => strict)
  @Column()
  password: string;

  @Column()
  create_At: Date;

  @Column()
  update_At: Date;

  @Column()
  deleted_At: Date;

}
