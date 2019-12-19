import { QueryUnassignedException } from "./queryUnassignedException";

describe("QueryUnassignedException tests", () => {
  it("Given a query, When create a QueryUnassignedException, Then the error message contains information about the query", () => {
    // Arrange
    class Ping {}
    const expected = "Ping isn't assign to a query handler. Did you forget to use the @QueryHandler decorator?";

    // Act
    const actual = new QueryUnassignedException(Ping).message;

    // Assert
    expect(actual).toBe(expected);
  });
});
