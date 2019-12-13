import { Registry } from "./registry";
import { RegistryType } from "./registryType";
import { Handler } from "../types/handler";

const getRegistry = <T>(type: RegistryType): Registry<T> => {
  return registries.find(r => r.type === type) as Registry<T>;
};

let registries: ReadonlyArray<Registry<any>> = [
  new Registry<Handler<unknown, unknown>>(RegistryType.QueryHandler)
];

export { getRegistry };
