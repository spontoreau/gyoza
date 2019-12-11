interface Handler<TMessage, TResult = void> {
  handle(message: TMessage): Promise<TResult>;
}

export { Handler };
