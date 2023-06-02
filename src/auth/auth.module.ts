import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        console.log(process.env.JWT_SECRET)
        let str = 'f73d79a4f9ee455040b870aba63fcaa08c36482837bb6f59f9f58d657c33ef270ec5373dce69d16932c3895e346929b06fcd283ea5ae9b63749c474e8d5ca2fd'
        return {
          signOptions: { expiresIn: '7d' },
          secret: str,
        };
      },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
