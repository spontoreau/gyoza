import { RegistryType } from "./registryType";

class Registry<T> {
  private readonly ctors: Map<Symbol, new (...args: unknown[]) => T>;

  constructor(public readonly type: RegistryType) {
    this.ctors = new Map();
  }

  add(key: Symbol, handler: new (...args: unknown[]) => T) {
    this.ctors.set(key, handler);
  }

  getInstance(key: Symbol): T {
    const ctor = this.ctors.get(key) as new (...args: unknown[]) => T;
    return new ctor();
  }
}

export { Registry };
