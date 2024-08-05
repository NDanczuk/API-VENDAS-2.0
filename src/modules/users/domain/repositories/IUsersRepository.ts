import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";
import { IUserPaginate } from "../models/IUserPaginate";

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUsersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IUserPaginate>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
