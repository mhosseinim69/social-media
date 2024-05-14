import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PostsModule } from './Posts/posts.module';
import { CommentsModule } from './Comments/comments.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { QueueModule } from './queues/queue.module';
import { ErrorHandlingMiddleware } from './error/error-handling.middleware';

@Module({
  imports: [UsersModule, AuthModule, PostsModule, CommentsModule, QueueModule, MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  })],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
  }
}

