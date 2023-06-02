/**
 * base model for user:
 * 
 *  Table: Usuario
    usu_id int auto_increment primary key,
    usu_cuenta        varchar(50) not null,
    usu_clave         varchar(50) not null,
    usu_nom           varchar(50) not null,
    est_id            int         null,
    usu_feccrea       datetime    null,
    usu_fecvncto      datetime    null,
    usu_token         varchar(50) null,
    usu_fecvnctotoken datetime    null,	
*/
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Status } from 'src/status/status.entity';
import { UserCompany } from 'src/user_company/user_company.entity';
import { UserRoleMenu } from 'src/user_role_menu/user_role_menu.entity';

@Entity({name: 'Usuario'})
export class User{

    @PrimaryGeneratedColumn()
    usu_id: number;

    @Column({unique: true})
    usu_cuenta: string;

    @Column()
    usu_clave: string;

    @Column()
    usu_nom: string;

    @Column()
    est_id: number;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    usu_feccrea: Date;

    @Column({nullable: true})
    usu_fecvncto: Date;

    @Column({nullable: true})
    usu_token: string;

    @Column({nullable: true})
    usu_fecvnctotoken: Date;

    @ManyToOne(() => Status)
    @JoinColumn({name: 'est_id'})
    status: Status;

    @OneToMany(() => UserCompany, userCompany => userCompany.user)
    userCompany: UserCompany[];

    @OneToMany(() => UserRoleMenu, userRoleMenu => userRoleMenu.user)
    userRoleMenu: UserRoleMenu[];
}