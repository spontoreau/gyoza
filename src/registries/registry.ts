import { RegistryType } from "./registryType";

class Registry<T> {
  private readonly ctors: Map<symbol, new (...args: unknown[]) => T>;

  constructor(public readonly type: RegistryType) {
    this.ctors = new Map();
  }

  add(key: symbol, handler: new (...args: unknown[]) => T) {
    this.ctors.set(key, handler);
  }

  hasKey(key: symbol) {
    return this.ctors.has(key);
  }

  getInstance(key: symbol): T {
    const ctor = this.ctors.get(key) as new (...args: unknown[]) => T;
    return new ctor();
  }
}

export { Registry };
