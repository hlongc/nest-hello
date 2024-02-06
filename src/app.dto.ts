import {
  Contains,
  IsEmail,
  IsFQDN,
  IsInt,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UserDto {
  name: string;
  @IsInt()
  age: number;
  hobby: string[];
}

export class InfoDto {
  @Length(5, 10)
  title: string;

  @Contains('hello', {
    message: 'content 必须包含 hello',
  })
  content: string;

  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;
}
