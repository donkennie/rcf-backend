import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users_entity';

export enum Category {
    Media = 'Media',
    Technology = 'Technology',
    Entertainment = 'Entertainment',
    FoodsAndDrinks = 'Foods-Drinks',
    Influencer = 'Influencer'
}

@Entity()
export class Business {
    @PrimaryGeneratedColumn('uuid')
    business_id: string;

    @Column({ length: 30, nullable: false, unique: true })
    name: string;

    @Column({ length: 30, nullable: false, unique: false })
    location: string;

    @Column({ length: 50, nullable: false, unique: false })
    summary: string;

    @Column({ length: 50, nullable: false, unique: false })
    BusinessContact: string;

    @Column({ length: 500 })
    bio: string;

    @Column()
    @ManyToOne(() => Users, (userData) => userData.user_id)
    @JoinColumn({ name: 'user_id' })
    user_id: string;

    @Column('text', { array: true})
    logo: string;

    @Column({
        type: 'enum',
        enum: Category, // Use the enum type here
        default: Category.Entertainment, // Set a default value as Low
    })
    category: Category;

    @Column('text', { array: true, default: [] })
    supported_files: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}