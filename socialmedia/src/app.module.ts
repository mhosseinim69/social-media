import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PostsModule } from './Posts/posts.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
