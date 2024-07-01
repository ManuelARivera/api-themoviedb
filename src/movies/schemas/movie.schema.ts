import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Movie {
  @Prop({ unique: true, type: Number })
  id: number;

  @Prop({ type: String })
  overview: string;

  @Prop({ type: String })
  poster_path: string;

  @Prop({ type: Date })
  release_date: Date;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Boolean })
  video: boolean;
}

export type MovieDocument = HydratedDocument<Movie>;

export const MovieSchema = SchemaFactory.createForClass(Movie);
