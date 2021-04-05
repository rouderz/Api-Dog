import {ConflictException, Injectable} from "@nestjs/common";
import {CreateFavoriteDto} from "./dto/create-favorite.dto";
import {UpdateFavoriteDto} from "./dto/update-favorite.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Favorite} from "./entities/favorite.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";


@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
        private readonly usersServices: UsersService
    ) {
    }

    async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
        return this.favoriteRepository.save(createFavoriteDto);
    }

    findOne(id: string) {
        const user = this.usersServices.findById(id);
        if (!user) {
            throw new ConflictException("El usuario no existe");
        } else {
            return this.favoriteRepository.findOne({id_user: id});
        }
    }

    async update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
        const user = await this.usersServices.findById(updateFavoriteDto.id_user);
        console.log(!user)
        if (!user) {
            throw new ConflictException("El usuario no existe");
        } else {
            this.favoriteRepository.update({id_user: updateFavoriteDto.id_user}, updateFavoriteDto).then(res => {
                return res;

            }).catch(err => {
                throw new ConflictException(err);
            });
        }
    }
}
