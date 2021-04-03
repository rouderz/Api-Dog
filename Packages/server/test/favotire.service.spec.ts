import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from '../src/modules/Favorite/favorite.service';

describe('FavotireService', () => {
  let service: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
