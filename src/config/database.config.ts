import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  // Option 2: Using individual environment variables
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT')!),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Set to false in production
    ssl: {
      rejectUnauthorized: false,
    },
  };
};
