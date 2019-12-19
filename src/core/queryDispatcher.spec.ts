import "reflect-metadata";
import { QueryHandler, QUERY_KEY } from "../decorators/queryHandler";
import { QueryDispatcher } from "./queryDispatcher";
import { Handler } from "../types/handler";
import { resetRegistries } from "../registries/context";
import uuid from "uuid";
import { UnknowQueryException } from "../exceptions/unknowQueryException";
import { QueryUnassignedException } from "../exceptions/queryUnassignedException";

describe("QueryDispatcher tests", () => {
  beforeAll(() => {
    resetRegistries();
  });

  it("Given a Query, When the QueryDispatcher dispatch it, Then a Handler returns a result", async () => {
    // Arrange
    const expected = uuid.v4();
    class Ping {
      constructor(public readonly value: string) {}
    }
    class Pong {
      constructor(public readonly value: string) {}
    }

    @QueryHandler(Ping)
    class PingQueryHandler implements Handler<Ping, Pong> {
      async handle(ping: Ping): Promise<Pong> {
        return Promise.resolve(new Pong(ping.value));
      }
    }

    // Act
    const queryDispatcher = new QueryDispatcher();
    const result = await queryDispatcher.dispatch<Ping, Pong>(
      new Ping(expected)
    );
    const actual = result.value;

    // Assert
    expect(actual).toBe(expected);
  });

  it("Given an unassigned query, When the QueryDispatcher dispatch it, Then the dispatcher throws an exception", async () => {
    // Arrange
    class Ping {

    }

    const expected = new UnknowQueryException(Ping);

    const queryDispatcher = new QueryDispatcher();

    // Act
    const promise = queryDispatcher.dispatch(new Ping()); ;
    
    // Assert
    await expect(promise).rejects.toThrow(expected);
  });

  it("Given a query with metadata manually added, When the QueryDispatcher dispatch it, Then the dispatcher throws an exception", async () => {    
    // This test cover a case that impossible to trigger.
    // Here for the coverage and to ensure that the lib is resilient to someone that is trying to exploit this kind of case.
    
    // Arrange
    class Ping {

    }

    const key = Symbol(Ping.name);
    Reflect.defineMetadata(QUERY_KEY, key, Ping);
    const expected = new QueryUnassignedException(Ping).message;
    const queryDispatcher = new QueryDispatcher();

    // Act
    const promise = queryDispatcher.dispatch(new Ping());
    
    // Assert
    await expect(promise).rejects.toThrow(expected);
  });
});
