import { HelloWorld } from "./helloWorld";

describe("HelloWorld class", () => {
  it("Should return 'Hello Sylvain!' when call get with 'Sylvain' as parameter", () => {
    // Arrange
    const expected = "Hello Sylvain!";
    const helloWorld = new HelloWorld();

    // Act
    const actual = helloWorld.get("Sylvain");

    // Assert
    expect(actual).toBe(expected);
  });
});
