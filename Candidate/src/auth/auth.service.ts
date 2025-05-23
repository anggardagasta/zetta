import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

// Define the structure of your token claims
interface TokenClaims {
    user_id: string;
    role: string;
    // Add other claims from jwt.RegisteredClaims if needed, e.g., exp, iat
    exp?: number;
    iat?: number;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    nbf?: number;
    jti?: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async validateToken(token: string): Promise<TokenClaims> {
        try {
            // Verify the token using the secret configured in JwtModule
            const payload = await this.jwtService.verifyAsync<TokenClaims>(token);
            // You can add more checks here if needed, e.g., check if user exists in DB
            return payload;
        } catch (e) {
            // Handle token verification errors (e.g., expired, invalid signature)
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    // Optional: Method to generate a token (useful for login)
    async generateToken(payload: { userId: string; role: string }): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
}