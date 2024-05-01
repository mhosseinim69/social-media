import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PostsModule } from './Posts/posts.module';
import { INestApplication } from '@nestjs/common';
import { JwtAuthGuard } from "../src/authentication/auth.guard";

describe('Pots', () => {
    let app: INestApplication;
    let postsService = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [PostsModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(postsService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET posts`, () => {
        return request(app.getHttpServer())
            .get('/posts')
            .expect(200)
            .expect((res) => {
                const { status, message, result } = res.body;
                expect(status).toBe('Ok!');
                expect(message).toBe('Successfully fetch data!');
                expect(result).toBeDefined();
                expect(result).toBeInstanceOf(Array);
                expect(result.length).toBeGreaterThan(0);
                expect(result[0].title).toBeTruthy();
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
