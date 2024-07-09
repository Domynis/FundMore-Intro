import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'Lv359Ymu!',
      database: 'social_media',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    CatsModule,
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
