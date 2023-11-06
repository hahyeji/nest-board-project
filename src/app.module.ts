import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./configs/typeorm.config";
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal : true,
          envFilePath : '.env.dev'
      }),
      TypeOrmModule.forRoot(typeormConfig),
      BoardsModule,
      AuthModule
  ]
})
export class AppModule {}
