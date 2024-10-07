export default interface RepositoryInterface<T> {
  create(entity: T): void;
  update(entity: T): void;
  find(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
}
