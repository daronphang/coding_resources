### HTTP Requests

HTTPClientTestingModule mocks the http requests while testing the service. HttpTestingController is injected into tests that allows for mocking and flushing of requests. Flush() is to provide dummy values as responses. Verify() is called after each test to verify that there are no outstanding http calls.

```js
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, {provide: Router, useValue: routerMock}]
    });

    injector = getTestBed();
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('authenticateUser() should return value if request is success', () => {
    const successResponse = {status: 200};

    service.authenticateUser('test', '12345').subscribe((res) => {
      expect(res.status).toBe(200);
    }, err => {
      expect(err === null).toBe(true);
    })

    const request = httpMock.expectOne('http://127.0.0.1:5000/auth');
    expect(request.request.method).toBe('POST');
    request.flush(successResponse);
  })

  it('authenticateUser() should throw error if request returns error', () => {
    const errResponse = {
      status: 404,
      statusText: 'failed to connect'
    };
    const errorMsg = 'An unknown error occurred.';

    service.authenticateUser('test', '12345').subscribe((res) => {
      expect(res === null).toBe(true);
    }, err => {
      expect(err).toBe(errorMsg);
    });

    const request = httpMock.expectOne('http://127.0.0.1:5000/auth');
    expect(request.request.method).toBe('POST');
    request.flush(errorMsg, errResponse);
  });

```
