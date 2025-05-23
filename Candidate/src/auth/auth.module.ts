import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtStrategy} from './strategies/jwt.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '60m'}, // Optional: token expiration
            }),
            inject: [ConfigService],
        }),
        ConfigModule, // Ensure ConfigModule is imported here
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {
}