import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users_entity';

export enum Category {
    Media = 'Media',
    Technology = 'Technology',
    Entertainment = 'Entertainment',
    FoodsAndDrinks = 'Foods-Drinks',
    Influencing = 'Influencering',
    Drinks = 'Drinks',
    Sports = 'Sports'
}

export enum Type {
    Branded = 'Branded',
    NonBranded = 'Non-Branded'
}

@Entity()
export class Business {
    @PrimaryGeneratedColumn('uuid')
    business_id: string;

    @Column({ length: 30, nullable: false, unique: true })
    name: string;

    @Column({ length: 30, nullable: false, unique: false })
    location: string;

    @Column({ length: 100, nullable: false, unique: false })
    summary: string;

    @Column({ length: 50, nullable: false, unique: false })
    BusinessContact: string;

    @Column({ length: 500 })
    bio: string;

    @Column({ length: 50 })
    skill: string;

    @Column({ length: 500 })
    title: string;

    @Column()
    @ManyToOne(() => Users, (userData) => userData.user_id)
    @JoinColumn({ name: 'user_id' })
    user_id: string;

    @Column('text', { array: true, nullable: false})
    logo: string;

    @Column({
        type: 'enum',
        enum: Category, // Use the enum type here
        default: Category.Entertainment, // Set a default value as Low
    })
    category: Category;

    @Column({
        type: 'enum',
        enum: Type, // Use the enum type here
        default: Type.Branded, // Set a default value as Low
    })
    type: Type;

    @Column({ length: 20 , nullable: false})
    number: string;

    @Column({nullable: false})
    email: string;

    @Column({ length: 500 , nullable: false})
    whatsapplink: string;


    @Column('text', { array: true, default: [] , nullable: false})
    supported_files: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}