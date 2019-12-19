class QueryUnassignedException extends Error {
  constructor(query: new (...args: any[]) => any) {
    super(`No handler is assigned to the ${ query.name } query, but it contains valid metadata. Did you manually defined metadada for this query? If so, please @QueryHandler decorator to ensure ${ query.name } is assigned to a handler. Otherwise, please fill an issue on the GitHub repository with a test that reproduce the problem.`);
  }
}

export { QueryUnassignedException };