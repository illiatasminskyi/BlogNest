import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  // const client = redis.createClient({ url: 'redis://localhost' });
  // const RedisStore = connectRedis(session);
  // client.on('connect', () => console.log('Connected to Redis'));
  app.use(
    session({
      secret: 'dahdgasdjhsadgsajhdsagdsdvhjd',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
      // store: new RedisStore({ client }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
