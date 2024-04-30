import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PostsModule } from './Posts/posts.module';
import { CommentsModule } from './Comments/comments.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
