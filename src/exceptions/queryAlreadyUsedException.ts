class QueryAlreadyUsedException extends Error {
  constructor(query: new (...args: any[]) => any) {
    super(`${query.name} already used to decorate a QueryHandler.`);
  }
}

export { QueryAlreadyUsedException };
