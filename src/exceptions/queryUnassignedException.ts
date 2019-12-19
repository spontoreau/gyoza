class QueryUnassignedException extends Error {
  constructor(query: new (...args: any[]) => any) {
    super(`${query.name} isn't assign to a query handler. Did you forget to use the @QueryHandler decorator?`);
  }
}

export { QueryUnassignedException };
