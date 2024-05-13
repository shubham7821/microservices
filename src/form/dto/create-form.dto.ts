import { IsNotEmpty } from 'class-validator';

export class CreateFormDto {
  id: string;

  @IsNotEmpty()
  data: JSON;
}
