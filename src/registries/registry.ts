import { RegistryType } from "./registryType";

class Registry<T> {
  private ctorDefinitions: Array<[Symbol, new (...args: unknown[]) => T]> = [];

  constructor(public readonly type: RegistryType) {}

  add(key: Symbol, handler: new (...args: unknown[]) => T) {
    this.ctorDefinitions.push([key, handler]);
  }

  getInstance(key: Symbol): T {
    const ctorDefinition = this.ctorDefinitions.find(h => h[0] === key) as [Symbol, new (...args: unknown[]) => T];
    const ctor = ctorDefinition[1];
      return new ctor();
  }
}

export { Registry };
