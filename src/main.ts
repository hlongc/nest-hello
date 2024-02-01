import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 静态资源预览
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3000);

  setTimeout(() => {
    app.close();
  }, 5000);
}
bootstrap();
