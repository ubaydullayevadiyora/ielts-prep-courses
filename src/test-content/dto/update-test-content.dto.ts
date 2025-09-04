import { PartialType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test-content.dto';

export class UpdateTestContentDto extends PartialType(CreateTestDto) {}
