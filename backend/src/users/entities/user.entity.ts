import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30, nullable: false })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе', length: 200 })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  wishlists: Wishlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
