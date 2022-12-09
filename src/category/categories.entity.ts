import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categorys {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
}
