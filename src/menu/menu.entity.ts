/**
 * base model for menu:
 * create table Menu
(
    men_id      int auto_increment
        primary key,
    men_nom     varchar(50) not null,
    men_ruta    varchar(50) not null,
    men_idpadre int         null,
    men_nivel   int         null,
    men_orden   int         null,
    men_icono   varchar(50) null,
    est_id      int         null,
    constraint men_nom
        unique (men_nom),
    constraint fk_Menu_Estado
        foreign key (est_id) references Estado (est_id),
    constraint fk_Menu_Menu
        foreign key (men_idpadre) references Menu (men_id)
);
 */

import { Status } from 'src/status/status.entity';
import { RoleMenu } from 'src/role_menu/role_menu.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'Menu' })
export class Menu {

    @PrimaryGeneratedColumn()
    men_id: number;

    @Column({ nullable: true })
    men_nom: string;

    @Column({ nullable: true })
    men_ruta: string;

    @OneToOne(() => Menu)
    @JoinColumn({ name: 'men_idpadre' })
    menu: Menu;

    @Column({ nullable: true })
    men_nivel: number;

    @Column({ nullable: true })
    men_orden: number;

    @Column({ nullable: true })
    men_icono: string;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'est_id' })
    status: Status;

    @OneToMany(() => RoleMenu, roleMenu => roleMenu.menu)
    roleMenu: RoleMenu[];
}