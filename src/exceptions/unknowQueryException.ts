class UnknowQueryException extends Error {
  constructor(query: new (...args: any[]) => any) {
    super(
      `Unknow ${query.name} query. Did you forget to use the @QueryHandler decorator?`
    );
  }
}

export { UnknowQueryException };
