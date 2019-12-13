import { Handler } from "../types/handler";
import { QueryAlreadyUsedException } from "../exceptions/queryAlreadyUsedException";
import { getRegistry } from "../registries/context";
import { RegistryType } from "../registries/registryType";

const QUERY_KEY = Symbol("Query");

const QueryHandler = <TQuery, TResult>(
  target: new (...parameters: any[]) => TQuery
) => {
  const meta: Symbol | "" = Reflect.getOwnMetadata(QUERY_KEY, target) ?? "";

  if (meta) {
    throw new QueryAlreadyUsedException(target);
  }

  const key = Symbol(target.name);

  Reflect.defineMetadata(QUERY_KEY, key, target);

  return (queryHandler: new () => Handler<TQuery, TResult>) => {
    const registry = getRegistry<Handler<unknown, unknown>>(
      RegistryType.QueryHandler
    );

    if(!("handle" in queryHandler.prototype)) {
      throw new Error(`${queryHandler.name} doesn't defined any 'handle' method.`);
    }

    registry.add(key, queryHandler);
  };
};

export { QUERY_KEY, QueryHandler };
