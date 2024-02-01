import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController implements OnModuleInit, OnApplicationBootstrap {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  // content-type=application/x-www-form-urlencoded
  @Post('/urlencoded')
  body(@Body() createPersonDot: CreatePersonDto) {
    return createPersonDot;
  }

  // content-type=application/json
  @Post('/json')
  json(@Body() createPersonDot: CreatePersonDto) {
    return createPersonDot;
  }

  // content-type=multipart/form-data
  @Post('/formdata')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  formdata(
    @Body() createPersonDot: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('files', files);
    return createPersonDot;
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get('/find')
  query(@Query('name') name: string) {
    return `接收到name: ${name}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `url param参数id: ${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  onModuleInit() {
    console.log('person controller onMoudleInit');
  }

  onApplicationBootstrap() {
    console.log('person controller onApplicationBootstrap');
  }
}
