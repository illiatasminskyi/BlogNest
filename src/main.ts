import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';
import { Logger } from '@nestjs/common';
import * as csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCsrf from 'fastify-csrf';

async function bootstrap() {
  const logger = new Logger();
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Session
  const RedisStore = connectRedis(session);
  const redisClient = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  redisClient.on('error', (err) =>
    Logger.error('Could not establish a connection with redis. ' + err),
  );
  redisClient.on('connect', () =>
    Logger.verbose('Connected to redis successfully'),
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient as any }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
