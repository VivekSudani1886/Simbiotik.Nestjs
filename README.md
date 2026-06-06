# College Course Enrollment System - NestJS API

A production-ready NestJS backend API for managing college course enrollments with JWT authentication, MongoDB, and Swagger documentation.

## Features

✅ Admin Authentication with JWT & Bcrypt  
✅ Student Management (CRUD)  
✅ Course Management (CRUD)  
✅ Enrollment Management with Business Rules  
✅ Prevent duplicate enrollments  
✅ Course capacity management  
✅ MongoDB with Mongoose ODM  
✅ Swagger API Documentation  
✅ Role-based JWT Guards  
✅ Class-validator validation  
✅ Global ValidationPipe  
✅ Production-ready error handling  

## Tech Stack

- **Framework**: NestJS 10
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport
- **API Docs**: Swagger/OpenAPI
- **Validation**: Class-validator
- **Password**: Bcrypt
- **Language**: TypeScript 5

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/college_enrollment
JWT_SECRET=supersecretkey
PORT=3000
```

### 3. Run Development Server

```bash
npm run start:dev
```

Server runs on http://localhost:3000  
Swagger docs available at http://localhost:3000/docs

## Project Structure

```
src/
├── admin/                          # Admin module
│   ├── schemas/admin.schema.ts    # Mongoose schema
│   ├── dto/create-admin.dto.ts    # DTO
│   ├── admin.controller.ts        # Controller
│   ├── admin.service.ts           # Service
│   └── admin.module.ts            # Module
│
├── auth/                           # Authentication module
│   ├── dto/
│   │   ├── register-admin.dto.ts
│   │   └── login.dto.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts            # JWT Passport strategy
│   └── auth.module.ts
│
├── students/                       # Students module
│   ├── schemas/student.schema.ts
│   ├── dto/
│   │   ├── create-student.dto.ts
│   │   └── update-student.dto.ts
│   ├── students.controller.ts
│   ├── students.service.ts
│   └── students.module.ts
│
├── courses/                        # Courses module
│   ├── schemas/course.schema.ts
│   ├── dto/
│   │   ├── create-course.dto.ts
│   │   └── update-course.dto.ts
│   ├── courses.controller.ts
│   ├── courses.service.ts
│   └── courses.module.ts
│
├── enrollments/                    # Enrollments module
│   ├── schemas/enrollment.schema.ts
│   ├── dto/create-enrollment.dto.ts
│   ├── enrollments.controller.ts
│   ├── enrollments.service.ts
│   └── enrollments.module.ts
│
├── common/
│   └── guards/jwt-auth.guard.ts   # JWT Guard for protected routes
│
├── app.module.ts                  # Main app module
└── main.ts                        # Application entry point
```

## API Endpoints

### Authentication (No Auth Required)

```http
POST /auth/register
POST /auth/login
```

### Students

```http
GET    /students              # Public: Get all
GET    /students/:id          # Public: Get by ID
POST   /students              # Protected: Create
PUT    /students/:id          # Protected: Update
DELETE /students/:id          # Protected: Delete
```

### Courses

```http
GET    /courses               # Public: Get all
GET    /courses/:id           # Public: Get by ID
POST   /courses               # Protected: Create
PUT    /courses/:id           # Protected: Update
DELETE /courses/:id           # Protected: Delete
```

### Enrollments

```http
GET    /enrollments           # Public: Get all
GET    /enrollments/:id       # Public: Get by ID
POST   /enrollments           # Protected: Create
DELETE /enrollments/:id       # Protected: Delete
```

## Usage Examples

### 1. Register Admin

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@college.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "admin@college.com",
  "name": "Admin User"
}
```

### 2. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@college.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Create Student (Protected - Requires JWT)

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "John Doe",
    "email": "john@college.com"
  }'
```

### 4. Get All Students

```bash
curl http://localhost:3000/students
```

### 5. Create Course (Protected)

```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Web Development",
    "description": "Learn web development with NestJS",
    "capacity": 50
  }'
```

### 6. Create Enrollment (Protected)

```bash
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "studentId": "507f1f77bcf86cd799439012",
    "courseId": "507f1f77bcf86cd799439013"
  }'
```

## Business Rules Validation

### Rule 1: No Duplicate Enrollments

If a student attempts to enroll in the same course twice:

```json
{
  "statusCode": 400,
  "message": "Student already enrolled in this course",
  "error": "Bad Request"
}
```

### Rule 2: Course Capacity Check

If course capacity is reached:

```json
{
  "statusCode": 400,
  "message": "Course capacity reached",
  "error": "Bad Request"
}
```

## Sample MongoDB Documents

### Admin Collection

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439010"),
  "name": "Admin User",
  "email": "admin@college.com",
  "password": "$2b$10$abcdef...", // bcrypt hashed
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

### Students Collection

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@college.com",
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

### Courses Collection

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Introduction to NestJS",
  "description": "Learn NestJS framework and best practices",
  "capacity": 30,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

### Enrollments Collection

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "studentId": ObjectId("507f1f77bcf86cd799439011"),
  "courseId": ObjectId("507f1f77bcf86cd799439012"),
  "enrolledAt": ISODate("2024-01-01T10:00:00Z"),
  "createdAt": ISODate("2024-01-01T10:00:00Z"),
  "updatedAt": ISODate("2024-01-01T10:00:00Z")
}
```

## Testing with Swagger

1. Start server: `npm run start:dev`
2. Visit: http://localhost:3000/docs
3. Click **Authorize** button in top-right
4. Paste JWT token: `Bearer <your-token>`
5. Test all endpoints directly in Swagger UI

## Postman Collection

### Import Variables

```json
{
  "baseUrl": "http://localhost:3000",
  "adminToken": ""
}
```

### Workflow

1. **POST /auth/register** → Create admin
2. **POST /auth/login** → Get token (save to adminToken)
3. **POST /students** → Create student (copy ID)
4. **POST /courses** → Create course (copy ID)
5. **POST /enrollments** → Create enrollment with student & course IDs

## Available Scripts

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start

# Linting
npm run lint
```

## Key Features Explained

### JWT Authentication

- **Secret**: Set via `JWT_SECRET` env variable
- **Expiry**: 8 hours
- **Strategy**: Bearer token in Authorization header
- **Validation**: `@UseGuards(JwtAuthGuard)` decorator

### Global Validation

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,      // Strip unknown properties
    transform: true,      // Auto-transform to DTO
  }),
);
```

### Error Handling

All errors return consistent format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

Supported exceptions:
- `BadRequestException` - Invalid input
- `UnauthorizedException` - Invalid credentials
- `NotFoundException` - Resource not found

### Database Indexes

- `Admin.email` - Unique index
- `Student.email` - Unique index
- `Enrollment.studentId + courseId` - Unique index (composite)

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| MONGO_URI | Yes | - | MongoDB connection string |
| JWT_SECRET | Yes | - | JWT signing secret |
| PORT | No | 3000 | Server port |

## Performance Notes

- Mongoose lean queries for read operations
- Composite indexes on frequently searched fields
- Population of references only where needed
- Efficient capacity checking before enrollment

## Security Features

✅ Password hashing with bcrypt (salt: 10 rounds)  
✅ JWT token expiration  
✅ Route guards for protected endpoints  
✅ Email uniqueness constraints  
✅ Input validation and sanitization  
✅ Secure error messages (no stack traces in production)  

## License

MIT

$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
