import { Handler } from "../types/handler";
import { QueryAlreadyUsedException } from "../exceptions/queryAlreadyUsedException";
import { getRegistry } from "../registries/context";
import { RegistryType } from "../registries/registryType";

const QUERY_KEY = Symbol("Query");

const QueryHandler = <TQuery, TResult>(
  query: new (...parameters: any[]) => TQuery
) => {
  const meta: Symbol | "" = Reflect.getOwnMetadata(QUERY_KEY, query) ?? "";

  if (meta) {
    throw new QueryAlreadyUsedException(query);
  }

  const key = Symbol(query.name);

  Reflect.defineMetadata(QUERY_KEY, key, query);

  return (target: new () => Handler<TQuery, TResult>) => {
    const registry = getRegistry<Handler<unknown, unknown>>(
      RegistryType.QueryHandler
    );

    if(!("handle" in target.prototype)) {
      throw new Error(`${target.name} doesn't defined any 'handle' method.`);
    }

    registry.add(key, target);
  };
};

export { QUERY_KEY, QueryHandler };
