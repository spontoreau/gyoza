import "reflect-metadata";
import { QUERY_KEY } from "./queryHandler";
import { QueryHandler } from "./queryHandler";
import { Handler } from "../types/handler";
import { QueryAlreadyUsedException } from "../exceptions/queryAlreadyUsedException";
import { getRegistry, resetRegistries } from "../registries/context";
import { RegistryType } from "../registries/registryType";

describe("QueryHandler decorator tests", () => {
  beforeAll(() => {
    resetRegistries();
  });

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
    const expected = new QueryAlreadyUsedException(Ping);

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
    func.toThrow(expected);
  });

  it("Given a query, When a handler is decorated with the query, Then the handler registry contains it", () => {
    // Arrange
    class Pong {}
    class Ping {}

    // Act
    @QueryHandler(Ping)
    class PingQueryHandler implements Handler<Ping, Pong> {
      handle(command: Ping): Promise<Pong> {
        throw new Error("Method not implemented.");
      }
    }

    // Assert
    const registry = getRegistry(RegistryType.QueryHandler);
    const key = Reflect.getOwnMetadata(QUERY_KEY, Ping) as Symbol;
    const handler = registry.getInstance(key);
    const actual = handler instanceof PingQueryHandler;
    expect(actual).toBeTruthy();
  });

  it("Given a handler that doesn't implement the Handler interface, When decorated with QueryHandler decorator, Then it throws an exception", () => {
    // Arrange
    class Ping {}

    // Act
    const func = expect(() => {
      // @ts-ignore
      @QueryHandler(Ping)
      class PingQueryHandler {}
    });

    // Assert
    func.toThrowError(
      "PingQueryHandler doesn't defined any 'handle' method."
    );
  });
});
