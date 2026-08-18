import { IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsEmail()
  email!: string;
}

// 🔨 [POST /user with { "name": 12, "email": "notanemail" }]

// {
//   "message": [
//     "name must be a string",
//     "email must be an email"
//   ],
//   "error": "Bad Request",
//   "statusCode": 400
// }
