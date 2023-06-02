/**
 * base table for user_role_menu:
 create table UsuarioRolMenu
(
    usurolmen_id int auto_increment
        primary key,
    usu_id       int null,
    id_rolmenu   int null,
    est_id       int null,
    constraint fk_UsuarioRolMenu_Estado
        foreign key (est_id) references Estado (est_id),
    constraint fk_UsuarioRolMenu_RolMenu
        foreign key (id_rolmenu) references RolMenu (rolmen_id),
    constraint fk_UsuarioRolMenu_Usuario
        foreign key (usu_id) references Usuario (usu_id)
);
 */

import { User } from 'src/users/user.entity';
import { RoleMenu } from 'src/role_menu/role_menu.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { Status } from 'src/status/status.entity';

@Entity({ name: 'UsuarioRolMenu' })
export class UserRoleMenu {
        
            @PrimaryGeneratedColumn()
            usurolmen_id: number;
        
            @Column({ nullable: true })
            usu_id: number;
        
            @ManyToOne(() => User, (user) => user.userRoleMenu)
            @JoinColumn({ name: 'usu_id' })
            user: User;
        
            @Column({ nullable: true })
            id_rolmenu: number;
        
            @ManyToOne(() => RoleMenu, (roleMenu) => roleMenu.userRoleMenu)
            @JoinColumn({ name: 'id_rolmenu' })
            roleMenu: RoleMenu;
        
            @ManyToOne(() => Status)
            @JoinColumn({ name: 'est_id' })
            status: Status;
        }