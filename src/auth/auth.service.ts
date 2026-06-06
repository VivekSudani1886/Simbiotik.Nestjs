import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admin/admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterAdminDto) {
    const existing = await this.adminService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(dto.password, salt);
    const admin = await this.adminService.create({
      email: dto.email,
      password: hashed,
      name: dto.name,
    });
    return { id: admin._id, email: admin.email, name: admin.name };
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return admin;
  }

  async login(dto: LoginDto) {
    const admin = await this.validateAdmin(dto.email, dto.password);
    const payload = { sub: admin._id, email: admin.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
