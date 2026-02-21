import { Injectable, UnauthorizedException } from '@nestjs/common';
import { type LoginDTO, type RegisterDTO } from './auth.dto';
import { AuthRepository } from './auth.repository';
import { AppError } from '../../libs/errors/app.error';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly repo:AuthRepository
  ){}

  // user register
  async register(dto: RegisterDTO) {
    const existedUser=await this.repo.checkUserByEmail(dto.email)

    if(existedUser){
      throw new AppError(
        'Account already existed',
        400
      )
    }
    
    // hash pw
    const hashed_pw=bcrypt.hashSync(dto.password, 10)

    // created user
    const registerUser=await this.repo.registerUser({
      ...dto
    })

    return {
      message: 'User registered',
      data: dto,
    };
  }

  async login(dto: LoginDTO) {
    if (!dto?.email || !dto?.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };
  }

  async refresh(token: string) {
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      accessToken: 'new-access-token',
    };
  }

  async forgotPassword(email: string) {
    return {
      message: `Password reset link sent to ${email}`,
    };
  }

  async resetPassword(dto: any) {
    return {
      message: 'Password has been reset',
    };
  }

  async me() {
    return {
      id: 1,
      email: 'user@example.com',
    };
  }

  async changePassword(dto: any) {
    return {
      message: 'Password changed successfully',
    };
  }

  async logout() {
    return {
      message: 'Logged out successfully',
    };
  }
}