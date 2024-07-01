import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':id')
  async create(
    @Param('id') movieId: string,
    @Req() request: Request,
  ): Promise<number> {
    return await this.likesService.create(movieId, request.userId);
  }

  @Get(':id')
  findAllLike(@Param('id') movieId: string): Promise<number> {
    return this.likesService.findAllLikesForMovie(movieId);
  }

  @Get(':id/liked')
  findLike(
    @Param('id') movieId: string,
    @Req() request: Request,
  ): Promise<boolean> {
    return this.likesService.hasUserLikedMovie(movieId, request.userId);
  }
}
