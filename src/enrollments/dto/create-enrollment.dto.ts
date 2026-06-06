import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateEnrollmentDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  studentId: Types.ObjectId;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  courseId: Types.ObjectId;
}
