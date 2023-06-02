/**
    base table for role_menu:
    create table RolMenu
(
    rolmen_id int auto_increment
        primary key,
    id_rol    int null,
    id_menu   int null,
    est_id    int null,
    constraint RolMenu_ibfk_1
        foreign key (id_rol) references Rol (rol_id),
    constraint RolMenu_ibfk_2
        foreign key (id_menu) references Menu (men_id),
    constraint RolMenu_ibfk_3
        foreign key (est_id) references Estado (est_id)
);

create index est_id
    on RolMenu (est_id);

create index id_menu
    on RolMenu (id_menu);

create index id_rol
    on RolMenu (id_rol);

*/

import { Status } from 'src/status/status.entity';
import { Role } from 'src/role/role.entity';
import { Menu } from 'src/menu/menu.entity';

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserRoleMenu } from 'src/user_role_menu/user_role_menu.entity';

@Entity({ name: 'RolMenu' })
export class RoleMenu {

    @PrimaryGeneratedColumn()
    rolmen_id: number;

    @ManyToOne(() => Role, (role) => role.roleMenu)
    @JoinColumn({ name: "id_rol" })
    role: Role;

    @ManyToOne(() => Menu, (menu) => menu.roleMenu)
    @JoinColumn({ name: "id_menu" })
    menu: Menu;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'est_id' })
    status: Status;

    @OneToMany(() => UserRoleMenu, userRoleMenu => userRoleMenu.user)
    userRoleMenu: UserRoleMenu[];

}