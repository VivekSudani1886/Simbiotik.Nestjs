import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    // Check if enrollment already exists
    const existing = await this.enrollmentModel.findOne({
      studentId: dto.studentId,
      courseId: dto.courseId,
    });
    if (existing) {
      throw new BadRequestException('Student already enrolled in this course');
    }

    // Get course to check capacity
    const course = await this.coursesService.findById(dto.courseId.toString());

    // Count current enrollments for this course
    const enrollmentCount = await this.enrollmentModel.countDocuments({
      courseId: dto.courseId,
    });

    if (enrollmentCount >= course.capacity) {
      throw new BadRequestException('Course capacity reached');
    }

    const created = new this.enrollmentModel(dto);
    return created.save();
  }

  async findAll() {
    return this.enrollmentModel
      .find()
      .populate('studentId')
      .populate('courseId')
      .exec();
  }

  async findById(id: string) {
    const e = await this.enrollmentModel
      .findById(id)
      .populate('studentId')
      .populate('courseId')
      .exec();
    if (!e) throw new NotFoundException('Enrollment not found');
    return e;
  }

  async remove(id: string) {
    const res = await this.enrollmentModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Enrollment not found');
    return { deleted: true };
  }
}
