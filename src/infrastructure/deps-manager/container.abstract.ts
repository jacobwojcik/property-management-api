import type { Registry } from './registry.js';

export abstract class IContainer {
  protected registry!: Registry;
  abstract init(): Promise<void>;
  abstract get<T>(token: symbol): T;
  abstract disconnect(): Promise<void>;
}
