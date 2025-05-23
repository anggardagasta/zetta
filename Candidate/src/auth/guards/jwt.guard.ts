import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        // Fallback to HTTP headers
        const req = ctx.getContext().req;
        const tokenFromHTTP = req?.headers?.authorization;
        if (tokenFromHTTP) {
            console.log('Token extracted: Token present (from HTTP header)');
            return req;
        }

        console.log('Token extracted: No token extracted');
        return req;
    }
}
