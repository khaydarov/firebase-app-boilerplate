import * as path from 'path';

export function resolveConfigPath(env?: string) {
  if (!env) {
    return path.resolve('.env');
  }

  return path.resolve(`.env.${env}`);
}
