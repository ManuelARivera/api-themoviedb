import { Controller, Get } from '@nestjs/common';
import { HttpCustomService } from 'src/providers/http/http.service';
import { Movie } from 'src/movies/schemas/movie.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly httpService: HttpCustomService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.httpService.findAll();
  }
}
