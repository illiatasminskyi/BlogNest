import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { CategoryService } from './category/categories.service';
import { CategoryModule } from './category/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FacebookStrategy } from './users/facebook.strategy';
import { AppController } from './app.controller';
import { Users } from './users/users.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { Categories } from './category/categories.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Users, Tag, Categories],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    PostsModule,
    CategoryModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
