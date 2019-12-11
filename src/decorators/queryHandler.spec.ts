import "reflect-metadata";
import { QUERY_KEY } from "./queryHandler";
import { QueryHandler } from "./queryHandler";
import { Handler } from "../types/handler";

describe("QueryHandler decorator tests", () => {
  it("Given a query and a query handler, When the handler is decorated with the query as parameter, Then the query has handling metadata", () => {
    // Arrange
    class Ping {}
    class Pong {}

    const expected = Symbol(Ping.name).toString();

    // Act
    @QueryHandler(Ping)
    class PingQueryHandler implements Handler<Ping, Pong> {
      handle(command: Ping): Promise<Pong> {
        throw new Error("Method not implemented.");
      }
    }

    const actual: Symbol | "" = Reflect.getOwnMetadata(QUERY_KEY, Ping) ?? "";

    // Assert
    expect(actual.toString()).toBe(expected);
  });

  it("Given a query, When the query was already used to decorate a handler, Then the decorator throws an exception", () => {
    // Arrange
    class Ping {}
    class Pong {}

    // Act
    const func = expect(() => {
      @QueryHandler(Ping)
      class PingQueryHandler implements Handler<Ping, Pong> {
        handle(command: Ping): Promise<Pong> {
          throw new Error("Method not implemented.");
        }
      }

      @QueryHandler(Ping)
      class OtherQueryHandler implements Handler<Ping, Pong> {
        handle(command: Ping): Promise<Pong> {
          throw new Error("Method not implemented.");
        }
      }
    });

    // Assert
    func.toThrow("Ping already used to decorate a QueryHandler!");
  });
});
