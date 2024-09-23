import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { defaultRedirectResolver } from './default-redirect.resolver';

describe('defaultRedirectResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => defaultRedirectResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
