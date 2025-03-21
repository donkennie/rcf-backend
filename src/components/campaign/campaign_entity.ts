import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users_entity';


export enum TicketType {
    Free = 'Free',
    Paid = 'Paid'
}

Entity()
export class Campaign {
    @PrimaryGeneratedColumn('uuid')
    campaign_id: string;

    @Column({ length: 30, nullable: false, unique: false })
    name: string;

    @Column({ length: 30, nullable: false, unique: false })
    venue: string;

    @Column({ length: 50, nullable: false, unique: false })
    description: string;

    @Column({ length: 50, nullable: false, unique: false })
    whatsAppLink: string;

    @Column({ length: 50, nullable: false })
    duration: string;

    @Column()
    @ManyToOne(() => Users, (userData) => userData.user_id)
    @JoinColumn({ name: 'user_id' })
    user_id: string;

    @Column('text', { array: true})
    banner: string;

    @Column({
        type: 'enum',
        enum: TicketType, // Use the enum type here
        default: TicketType.Free, // Set a default value as Low
    })
    ticketType: TicketType;

    @Column('text', { array: true, default: [] })
    gallery_files: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}