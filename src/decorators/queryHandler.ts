import { Handler } from "../types/handler";

const QUERY_KEY = Symbol("Query");

const QueryHandler = <TQuery, TResult>(
  target: new (...parameters: any[]) => TQuery
) => {
  const meta = Symbol(target.name);
  Reflect.defineMetadata(
    QUERY_KEY,
    meta,
    target
  );

  return (queryHandler: new () => Handler<TQuery, TResult>) => {};
};

export { QUERY_KEY, QueryHandler };
