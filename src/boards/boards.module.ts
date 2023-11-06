import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import {BoardRepository} from "./board.repository";
import {TypeOrmExModule} from "../modules/typeorm.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports : [
      AuthModule,
      TypeOrmExModule.forCustomRepository([BoardRepository])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
