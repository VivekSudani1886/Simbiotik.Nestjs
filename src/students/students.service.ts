import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  async create(data: Partial<Student>) {
    const created = new this.studentModel(data);
    return created.save();
  }

  async findAll() {
    return this.studentModel.find().exec();
  }

  async findById(id: string) {
    const s = await this.studentModel.findById(id).exec();
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }

  async update(id: string, data: Partial<Student>) {
    const updated = await this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.studentModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Student not found');
    return { deleted: true };
  }
}
