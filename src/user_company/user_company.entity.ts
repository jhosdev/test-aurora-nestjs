/**
 * base table for user_company:
 create table EmpresaUsuario
(
    empusu_id int auto_increment
        primary key,
    usu_id    int null,
    emp_id    int null,
    est_id    int null,
    constraint fk_EmpresaUsuario_Empresa
        foreign key (emp_id) references Empresa (emp_id),
    constraint fk_EmpresaUsuario_Estado
        foreign key (est_id) references Estado (est_id),
    constraint fk_EmpresaUsuario_Usuario
        foreign key (usu_id) references Usuario (usu_id)
);
 */

import { User } from 'src/users/user.entity';
import { Company } from 'src/company/company.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Status } from 'src/status/status.entity';

@Entity({ name: 'EmpresaUsuario' })
export class UserCompany {
    
        @PrimaryGeneratedColumn()
        empusu_id: number;
    
        @Column({ nullable: true })
        usu_id: number;
    
        @ManyToOne(() => User, (user) => user.userCompany)
        @JoinColumn({ name: 'usu_id' })
        user: User;
    
        @Column({ nullable: true })
        emp_id: number;
    
        @ManyToOne(() => Company, (company) => company.userCompany)
        @JoinColumn({ name: 'emp_id' })
        company: Company;
    
        @Column({ nullable: true })
        est_id: number;
    
        @ManyToOne(() => Status)
        @JoinColumn({ name: 'est_id' })
        status: Status;
    }