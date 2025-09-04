import { PartialType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test-content.dto';

export class UpdateTestDto extends PartialType(CreateTestDto) {}
