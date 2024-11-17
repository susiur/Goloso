import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(12)
  @MaxLength(50)
  @Matches(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.\W).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter, a number, and a special character',
  })
  password: string;
}
