import { Max, MaxLength, Min, MinLength } from 'class-validator';

export class UserDto {
  @MinLength(2)
  @MaxLength(5)
  name: string;

  @Min(0)
  @Max(120)
  age: number;
}
