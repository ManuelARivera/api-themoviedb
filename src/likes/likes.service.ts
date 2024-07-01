import { Injectable } from '@nestjs/common';
import { Like } from './schema/likes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async create(movieId: string, userId: string): Promise<number> {
    const like = await this.likeModel.findOne({ movie: movieId, user: userId });

    if (like) {
      await this.likeModel.deleteOne({ _id: like._id });
      return 0;
    }

    await this.likeModel.create({
      movie: movieId,
      user: userId,
    });

    return 1;
  }

  async findAllLikesForMovie(movieId: string): Promise<number> {
    return this.likeModel.countDocuments({ movie: movieId }).exec();
  }

  async hasUserLikedMovie(movieId: string, userId: string): Promise<boolean> {
    const like = await this.likeModel.findOne({ movie: movieId, user: userId });

    return !!like;
  }
}
