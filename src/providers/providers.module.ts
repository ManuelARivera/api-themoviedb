import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';
import { HttpModule } from '@nestjs/axios';
import { Movie, MovieSchema } from 'src/movies/schemas/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
  ],
  providers: [HttpCustomService],
  exports: [HttpCustomService, HttpModule],
})
export class ProvidersModule {}
