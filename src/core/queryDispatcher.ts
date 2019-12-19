import { Dispatcher } from "../types/dispatcher";
import { Registry } from "../registries/registry";
import { Handler } from "../types/handler";
import { getRegistry } from "../registries/context";
import { RegistryType } from "../registries/registryType";
import { QUERY_KEY } from "../decorators/queryHandler";
import { UnknowQueryException } from "../exceptions/unknowQueryException";
import { QueryUnassignedException } from "../exceptions/queryUnassignedException";

class QueryDispatcher implements Dispatcher {
  private readonly registry: Registry<Handler<unknown, unknown>>;

  constructor() {
    this.registry = getRegistry(RegistryType.QueryHandler);
  }

  async dispatch<TMessage, TResult>(query: TMessage): Promise<TResult> {
    const ctor = (query as any).constructor;
    const key: Symbol | "" = Reflect.getOwnMetadata(QUERY_KEY, ctor) ?? "";

    if(key) {
      if(!this.registry.hasKey(key)) {
        throw new QueryUnassignedException(ctor);
      }

      const handler = this.registry.getInstance(key);
      const result = (await handler.handle(query) as unknown) as TResult;
      return result;
      
    } else {
      throw new UnknowQueryException(ctor);
    }
  }
}

export { QueryDispatcher };
