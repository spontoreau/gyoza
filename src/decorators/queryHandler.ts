import { Handler } from "../types/handler";

const QUERY_KEY = Symbol("Query");

const QueryHandler = <TQuery, TResult>(
  target: new (...parameters: any[]) => TQuery
) => {
  const meta: Symbol | "" = Reflect.getOwnMetadata(QUERY_KEY, target) ?? "";

  if (meta) {
    throw new Error(`${target.name} already used to decorate a QueryHandler!`);
  }

  const key = Symbol(target.name);

  Reflect.defineMetadata(QUERY_KEY, key, target);

  return (queryHandler: new () => Handler<TQuery, TResult>) => {};
};

export { QUERY_KEY, QueryHandler };
