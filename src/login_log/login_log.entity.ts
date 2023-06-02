/**
 * base table for login_log:
 * create table BitacoraInicioSesion
(
    bitini_id     int auto_increment
        primary key,
    usu_id        int          null,
    bitini_fecing datetime     null,
    bitini_lat    varchar(255) null,
    bitini_long   varchar(255) null,
    emp_id        int          null,
    constraint fk_BitacoraInicioSesion_Empresa
        foreign key (emp_id) references Empresa (emp_id),
    constraint fk_BitacoraInicioSesion_Usuario
        foreign key (usu_id) references Usuario (usu_id)
);
*/

import { User } from 'src/users/user.entity';
import { Company } from 'src/company/company.entity';

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'BitacoraInicioSesion' })

export class LoginLog {

    @PrimaryGeneratedColumn()
    bitini_id: number;

    @Column({ nullable: true })
    usu_id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'usu_id' })
    user: User;

    @Column({ nullable: true })
    bitini_fecing: Date;

    @Column({ nullable: true })
    bitini_lat: string;

    @Column({ nullable: true })
    bitini_long: string;

    @Column({ nullable: true })
    emp_id: number;

    @OneToOne(() => Company)
    @JoinColumn({ name: 'emp_id' })
    company: Company;
}