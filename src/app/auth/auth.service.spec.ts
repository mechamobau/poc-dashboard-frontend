import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { JwtModule } from "@auth0/angular-jwt"

import * as jwt from "jsonwebtoken"

describe('AuthService test suite', function () {
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  beforeEach(function () {
    localStorage.removeItem("token");

    jasmine.clock().install();

    TestBed.configureTestingModule({
      imports: [
        JwtModule.forRoot({
          config: {
            tokenGetter: () => localStorage.getItem("token"),
          }
        })
      ],
      providers: []
    })
  });

  it('should be created', function () {

    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();

  });

  it('should return false in the case of token doesn\'t exist', function () {

    const service: AuthService = TestBed.get(AuthService);

    localStorage.removeItem("token")

    expect(service.isAuthenticated()).toBe(false)

  })

  it('should return false in the case of token exists but, is invalid', function () {
    const MOCK_TOKEN: string = jwt.sign({"username": "mockusername"}, "secret", { expiresIn: 0 });

    const service: AuthService = TestBed.get(AuthService);

    localStorage.setItem("token", MOCK_TOKEN)

    const authenticated = service.isAuthenticated();

    expect(authenticated).toBe(false);
  })

  it('should be valid in the case of token exists and valid', function () {
      const MOCK_TOKEN: string = jwt.sign({"username": "mockusername"}, "secret", { expiresIn: 2000 });

      const service: AuthService = TestBed.get(AuthService);

      localStorage.setItem("token", MOCK_TOKEN)

      const authenticated = service.isAuthenticated();

      expect(authenticated).toBe(true);
    }
  )
});
