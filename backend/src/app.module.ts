import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<
          | 'mysql'
          | 'mariadb'
          | 'postgres'
          | 'cockroachdb'
          | 'sqlite'
          | 'mssql'
          | 'sap'
          | 'oracle'
          | 'cordova'
          | 'nativescript'
          | 'react-native'
          | 'mongodb'
          | 'aurora-mysql'
          | 'aurora-postgres'
          | 'expo'
          | 'better-sqlite3'
          | 'capacitor'
          | 'spanner'
        >('DATABASE_TYPE'),
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User, Wish, Wishlist, Offer], // путь к сущностям
        synchronize: true, // авто обновление схемы базы (только для разработки)
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
