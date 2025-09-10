import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  save(user: UserEntity) {
    this.users.push(user);
  }

  update(id: string, updateData: Partial<UserEntity>) {
    const user = this.findById(id);

    Object.entries(updateData).forEach(([key, value]) => {
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
