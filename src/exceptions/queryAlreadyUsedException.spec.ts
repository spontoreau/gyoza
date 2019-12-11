import { QueryAlreadyUsedException } from "./queryAlreadyUsedException";

describe("QueryAlreadyUsedException tests", () => {
  it("Given a query, When create a QueryAlreadyUserException, Then the error message contains information about the query", () => {
    // Arrange
    class Ping {}
    const expected = "Ping already used to decorate a QueryHandler.";

    // Act
    const actual = new QueryAlreadyUsedException(Ping).message;

    // Assert
    expect(actual).toBe(expected);
  });
});
