/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { PORT_MQTT, USERNAME_MQTT, PASSWORD_MQTT } = process.env;
  console.log('USERNAME_MQTT', USERNAME_MQTT);
  console.log('PASSWORD_MQTT', PASSWORD_MQTT);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // handle swaggerNodule
  const config = new DocumentBuilder()
    .setTitle('IOT API Document')
    // .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Enable MQTT transport
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: `mqtt://localhost:${PORT_MQTT}`,
        username: USERNAME_MQTT,
        password: PASSWORD_MQTT,
      },
    },
  );

  // Start both the HTTP and MQTT servers

  await app.listen(3001);
  await mqttApp.listen();
}
bootstrap();
