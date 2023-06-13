import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
	login: 'test@gmail.com',
	password: 'test'
}

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
            })
	});

	it('/auth/login (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, password: '121'})
			.expect(401, {
                statusCode: 401,
                message: 'Wrong password',
                error: 'Unauthorized'
            })
	});

    it('/auth/login (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({...loginDto, login: 'testbad@gmail.com'})
			.expect(401, {
                statusCode: 401,
                message: 'User not found',
                error: 'Unauthorized'
            })
	});

	afterAll(() => {
		disconnect();
	});


});
