import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteController } from '../src/modules/Favorite/favorite.controller';
import { FavoriteService } from '../src/modules/Favorite/favorite.service';

describe('FavotireController', () => {
  let controller: FavoriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [FavoriteService],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
