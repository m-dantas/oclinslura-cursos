import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  save(data: UserEntity) {
    this.users.push(data);
  }

  update(id: string, data: Partial<UserEntity>) {
    const user = this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') return;

      user[key] = value;
    });

    return user;
  }

  delete(id: string) {
    const user = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }

  findMany() {
    return this.users;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user !== undefined;
  }

  private findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
