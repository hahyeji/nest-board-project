import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import {BoardRepository} from "./board.repository";
import {TypeOrmExModule} from "../modules/typeorm.module";

@Module({
  imports : [
      TypeOrmExModule.forCustomRepository([BoardRepository])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
