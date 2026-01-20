import { IsUrl } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column('decimal', { scale: 2 })
  price: number;

  @Column('decimal', { scale: 2, default: 0 })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({ length: 1024, nullable: true })
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  offers: Offer[];

  @Column('int', { default: 0 })
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
