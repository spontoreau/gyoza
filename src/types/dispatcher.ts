interface Dispatcher {
  dispatch<TMessage, TResult = unknown>(message: TMessage): Promise<TResult>;
}

export { Dispatcher };
