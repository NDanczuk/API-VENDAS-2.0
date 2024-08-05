import User from "../entities/User";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { SearchParams } from "@modules/users/domain/repositories/IUsersRepository";
import { IUserPaginate } from "@modules/users/domain/models/IUserPaginate";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }
  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IUserPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({
      name,
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({
      id,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({
      email,
    });

    return user;
  }
}

export default UsersRepository;
