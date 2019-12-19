import { QueryUnassignedException } from "./queryUnassignedException";

describe("QueryUnassignedException tests", () => {
  it("Given a query, When create a UnknowQueryException, Then the error message contains information about the query", () => {
    // Arrange
    class Ping {}
    const expected =
      "No handler is assigned to the Ping query, but it contains valid metadata. Did you manually defined metadada for this query? If so, please @QueryHandler decorator to ensure Ping is assigned to a handler. Otherwise, please fill an issue on the GitHub repository with a test that reproduce the problem.";

    // Act
    const actual = new QueryUnassignedException(Ping).message;

    // Assert
    expect(actual).toBe(expected);
  });
});
