// update-user.dto.ts

import { IsOptional, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email?: string;

  // If the user's name can be updated, include the following lines:
  @IsOptional()
  @IsString()
  @MinLength(1) // Adjust the minimum length as needed
  @MaxLength(50) // Adjust the maximum length as needed
  name?: string;
  username: any;
  role: any;
  status: any;
}
