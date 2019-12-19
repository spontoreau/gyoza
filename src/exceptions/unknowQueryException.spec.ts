import { UnknowQueryException } from "./unknowQueryException";

describe("UnknowQueryException tests", () => {
  it("Given a query, When create a UnknowQueryException, Then the error message contains information about the query", () => {
    // Arrange
    class Ping {}
    const expected =
      "Unknow Ping query. Did you forget to use the @QueryHandler decorator?";

    // Act
    const actual = new UnknowQueryException(Ping).message;

    // Assert
    expect(actual).toBe(expected);
  });
});
