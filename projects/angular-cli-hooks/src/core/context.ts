import { readFileSync } from 'fs';
import { join } from 'path';
import { Config } from '../../schema';
import { BuilderCommandName } from '../model/builder-model';
import { Hook } from '../model/hook-model';

let config: Config | null;

export function getConfig(workspaceRoot: string): Config | null {
  const extendAngularCliJsonFileName = 'angular-cli-hooks.json';

  if (config === undefined) {
    try {
      config = JSON.parse(
        readFileSync(join(workspaceRoot, extendAngularCliJsonFileName), 'utf8')
      ) as Config;
    } catch {
      console.warn(
        `@berglund/angular-cli-hooks could not find an ${extendAngularCliJsonFileName} file in ${workspaceRoot}. ` +
          'This file must exists and include a property "hooksPackage".'
      );

      config = null;
    }
  }

  return config;
}

export function resolveHooks(
  workspaceRoot: string
): Hook<BuilderCommandName, {}>[] {
  const config = getConfig(workspaceRoot);

  if (!config) {
    return [];
  }

  const packageName = config.hookPackage;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const hooksPackage = require(packageName) as {
    default: Hook<BuilderCommandName, {}>[];
  };

  const hooks =
    hooksPackage && Array.isArray(hooksPackage.default)
      ? hooksPackage.default
      : [];

  if (hooks.length === 0) {
    console.warn(
      `@berglund/angular-cli-hooks could not resolve any hooks in package ${packageName}.`
    );
  }

  return hooks;
}
