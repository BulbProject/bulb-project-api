import { Context } from '../entity';

export function withDone(context: Context, done: (context: Context) => Promise<void>): void {
  afterAll(async () => {
    await done(context);
  });
}
