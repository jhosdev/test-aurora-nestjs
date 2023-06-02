/**
 * base schema for 'Empresa':
create table Empresa
(
    emp_id     int auto_increment
        primary key,
    emp_nrodoc varchar(50) null,
    emp_nom    varchar(50) null,
    emp_dir    varchar(50) null,
    emp_telef  varchar(50) null,
    id_pais    int         null,
    est_id     int         null,
    constraint fk_Empresa_Estados
        foreign key (est_id) references Estado (est_id),
    constraint fk_Empresa_Pais
        foreign key (id_pais) references Pais (pai_id)
);
 */

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Country } from 'src/country/country.entity';
import { Status } from 'src/status/status.entity';
import { UserCompany } from 'src/user_company/user_company.entity';

@Entity({ name: 'Empresa' })
export class Company {

    @PrimaryGeneratedColumn()
    emp_id: number;

    @Column({ nullable: true })
    emp_nrodoc: string;

    @Column({ nullable: true })
    emp_nom: string;

    @Column({ nullable: true })
    emp_dir: string;

    @Column({ nullable: true })
    emp_telef: string;

    @OneToOne(() => Country)
    @JoinColumn({ name: 'id_pais' })
    country: Country;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'est_id' })
    status: Status;

    @OneToMany(() => UserCompany, userCompany => userCompany.user)
    userCompany: UserCompany[];
}