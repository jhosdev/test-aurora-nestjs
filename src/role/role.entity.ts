/**
 * base model for role:
 * create table Rol
(
    rol_id  int auto_increment
        primary key,
    rol_nom varchar(255) not null,
    est_id  int          null,
    constraint rol_nom
        unique (rol_nom),
    constraint Rol_ibfk_1
        foreign key (est_id) references Estado (est_id)
);

create index est_id
    on Rol (est_id);
*/

import { Status } from 'src/status/status.entity';
import { RoleMenu } from 'src/role_menu/role_menu.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'Rol' })
export class Role {

    @PrimaryGeneratedColumn()
    rol_id: number;

    @Column({ nullable: true })
    rol_nom: string;

    @Column({ nullable: true })
    est_id: number;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'est_id' })
    status: Status;

    @OneToMany(() => RoleMenu, roleMenu => roleMenu.role)
    roleMenu: RoleMenu[];
}