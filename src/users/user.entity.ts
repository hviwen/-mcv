import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name?: string;

  @AfterInsert()
  logInsert() {
    console.log('=== Insert User by id >>', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('=== Remove User by id >>', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('=== Update User by id >>', this.id);
  }
}
