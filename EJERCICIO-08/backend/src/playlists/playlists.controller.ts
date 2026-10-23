import { Controller,Get,Post, Param,ParseIntPipe, Body } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreateCancionDto } from './create-cancion.dto';

@Controller('playlists')
export class PlaylistsController {
 constructor(private readonly service:PlaylistsService){}

 @Get(':id')
 findOne(@Param('id',ParseIntPipe) id:number){
   return this.service.findOne(id);
 }

 @Post()create(@Body() dto: CreateCancionDto){
    return this.service.create(dto);
 }
}