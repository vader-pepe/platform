import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, type VerifyCallback } from "passport-google-oauth2";

@Injectable()
export class GoogleOauthGuard extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'TODO',
      clientSecret: 'TODO',
      callbackURL: 'TODO',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
