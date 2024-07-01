import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { HttpCustomService } from 'src/providers/http/http.service';
import { Movie, MovieSchema } from 'src/movies/schemas/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [HttpCustomService],
})
export class MoviesModule {}
