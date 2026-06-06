import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async create(data: Partial<Admin>) {
    const created = new this.adminModel(data);
    return created.save();
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async findAll() {
    return this.adminModel.find().select('-password').exec();
  }
}
