import { Controller, Get, Post, Put, Body, Param, NotFoundException} from '@nestjs/common';
import { GuardianService } from './guardian.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
import { Public } from 'src/common/constants/routes.constant';
import { User } from 'src/common/decorators/param-decorator/User.decorator';


@ApiBearerAuth()
@ApiTags("guardian")
@Controller({ path: 'guardian', version: '1' })
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @Public()
  @Post('')
  createUser(@Body() createGuardianDto: CreateGuardianDto) {
    return this.guardianService.createGuardian(createGuardianDto);
  }

  // @Put(':id')
  // async updateGuardian(@User('userId') userId: string, @Body() updateGuardianDto: UpdateGuardianDto): Promise<User> {
  //   return this.guardianService.updateGuardian(userId, updateGuardianDto);
  // }
  
  @Get()
  async getAllGuardian(){
    return this.guardianService.getAllGuardian();
  }

  @Get('has-orphans')
  async checkGuardianOrphans(@User('userId') userId: string) {
    return await this.guardianService.hasOrphans(userId);
  }

  @Get('top-guardian')
  async getGuardianSummary() {
    return await this.guardianService.getTopGuardian();  
  }

}
