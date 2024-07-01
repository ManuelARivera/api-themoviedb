import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/schema/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    const newUserObject = { ...userObject, password: plainToHash };

    try {
      await this.userModel.create(newUserObject);
      return {
        message: 'User created successfully.',
      };
    } catch (error) {
      const duplicateKey = Object.keys(error.keyPattern)[0];
      throw new HttpException(
        `${duplicateKey.charAt(0).toUpperCase() + duplicateKey.slice(1)} already exists.`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;

    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkPaword = await compare(password, findUser.password);
    if (!checkPaword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = { sub: findUser._id, name: findUser.name };
    const user = {
      name: findUser.name,
      email: findUser.email,
    };
    const data = {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
    return data;
  }
}
