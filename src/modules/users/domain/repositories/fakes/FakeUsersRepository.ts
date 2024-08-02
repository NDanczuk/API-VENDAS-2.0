import { v4 as uuidv4 } from "uuid";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import User from "@modules/users/infra/typeorm/entities/User";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [
    {
      name: "Jorge Prego",
      email: "Prego@gmail.com",
      password: "Prego",
      id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      created_at: new Date(2024),
      updated_at: new Date(2024),
      avatar:
        "/home/nicolasdanczuck/workspace/VS/API-VENDAS-2.0/uploads/49c3faf5a3a8260123a1-20240622_160537.jpg",
      getAvatarUrl(): string | null {
        if (!this.avatar) {
          return null;
        }

        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      },
    },
  ];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {}

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
}

export default FakeUsersRepository;
