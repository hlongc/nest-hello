import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets('public', { prefix: '/static' });

  // 设置正确的字符编码
  app.use((req, res, next) => {
    req.setEncoding('utf8');
    next();
  });

  await app.listen(3000);
}
bootstrap();
