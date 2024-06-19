import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  const env: any = new EnvService();

  const browserWindow: any = window || {};
  const browserWindowEnv = browserWindow['__env'] || {};

  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      // @ts-ignore
      env[key] = window['__env'][key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
