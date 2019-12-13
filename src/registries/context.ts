import { Registry } from "./registry";
import { RegistryType } from "./registryType";
import { Handler } from "../types/handler";

const getRegistry = <T>(type: RegistryType): Registry<T> => {
  return registries.find(r => r.type === type) as Registry<T>;
};

const getRegistries = (): ReadonlyArray<Registry<any>> => {
  return [
    new Registry<Handler<unknown, unknown>>(RegistryType.QueryHandler)
  ];
}

const resetRegistries = () => {
  registries = getRegistries();
};

let registries = getRegistries();

export { getRegistry, resetRegistries };
