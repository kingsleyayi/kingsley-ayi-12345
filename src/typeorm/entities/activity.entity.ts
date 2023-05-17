import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable : true})
  contract_address!: string;

  @Column({ type: 'double', nullable:true })
  token_index!: number;

  @Column({ type: 'double', nullable:true })
  listing_price!: number;

  @Column({ nullable : true})
  maker!: string;

  @Column({ nullable : true})
  listing_to!: Date;

  @Column({ nullable : true})
  listing_from!: Date;

  @Column({ nullable : true})
  event_timestamp!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;
}
