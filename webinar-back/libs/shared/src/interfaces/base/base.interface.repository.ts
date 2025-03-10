import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

export interface BaseInterfaceRepository<T> { // it helps us to de-coupe data part from other parts and 
    //if we want to change db or orm we just modify this interface and not services
    create(data: DeepPartial<T>): T;
    createMany(data: DeepPartial<T>[]): T[];
    save(data: DeepPartial<T>): Promise<T>;
    saveMany(data: DeepPartial<T>[]): Promise<T[]>;
    // findOneById(id: number): Promise<T>;
    findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
    findAll(options?: FindManyOptions<T>): Promise<T[]>;
    remove(data: T): Promise<T>;
    findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
    preload(entityLike: DeepPartial<T>): Promise<T>;
  }