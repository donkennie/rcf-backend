import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

export enum MemberRole {
    Member = 'Member',
    Admin = 'Admin'
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ length: 50, nullable: true })
    firstname: string;

    @Column({ length: 50, nullable: true })
    lastname: string;

    @Column({ length: 30, nullable: false, unique: true })
    username: string;

    @Column({ length: 60, nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({length: 5})
    otp: number;

    @Column({default: false})
    account_verify: boolean;

    @Column({
        type: 'enum',
        enum: MemberRole, // Use the enum type here
        default: MemberRole.Member, // Set a default value as Low
    })
    memberRole: MemberRole;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}