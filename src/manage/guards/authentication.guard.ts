import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import atob from 'atob';

interface Credentials {
  username: string;
  password: string;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public constructor(private config: ConfigService) {}

  private static parseAuthorizationHeader(authorization: string): string {
    const [parsedAuthorization] = authorization.match(/(?<=Basic )(.+)/) || [];

    if (parsedAuthorization.length === 0) {
      throw new ForbiddenException('Incorrect `Authorization` header format');
    }

    return parsedAuthorization;
  }

  private static decodeCredentials(credentials: string): Credentials {
    const [username, password] = atob(credentials).split(':');

    return {
      username,
      password,
    };
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.handleAuthorization(request);
  }

  private async handleAuthorization(request: { headers: { authorization?: string } }): Promise<boolean> {
    if (!request.headers?.authorization) {
      throw new ForbiddenException();
    }

    try {
      const headerCredentials = AuthenticationGuard.parseAuthorizationHeader(request.headers.authorization);

      const credentials = AuthenticationGuard.decodeCredentials(headerCredentials);

      return this.validateCredentials(credentials);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private validateCredentials({ username, password }: Credentials): boolean {
    const manageCred = {
      username: this.config.get<string>('manage.username'),
      password: this.config.get<string>('manage.password'),
    };

    if (manageCred.username !== username || manageCred.password !== password) {
      throw new UnauthorizedException('Invalid credentials provided');
    }

    return true;
  }
}
