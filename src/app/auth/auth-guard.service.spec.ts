import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuardService test suite', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [
      RouterTestingModule.withRoutes([]),
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem("token"),
        }
      })
    ],
    providers: [
      AuthService,
    ]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
