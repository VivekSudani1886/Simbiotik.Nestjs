import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(data: Partial<Course>) {
    const created = new this.courseModel(data);
    return created.save();
  }

  async findAll() {
    return this.courseModel.find().exec();
  }

  async findById(id: string) {
    const c = await this.courseModel.findById(id).exec();
    if (!c) throw new NotFoundException('Course not found');
    return c;
  }

  async update(id: string, data: Partial<Course>) {
    const updated = await this.courseModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Course not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.courseModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Course not found');
    return { deleted: true };
  }
}
