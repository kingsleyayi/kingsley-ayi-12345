import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  contract_address!: string;

  @Column({ type: "double", nullable: true })
  index!: number;

  @Column({ type: "double", nullable: true })
  current_price!: number | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;
}
