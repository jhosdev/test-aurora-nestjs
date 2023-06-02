import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * base model for status:
 est_id     int auto_increment
        primary key,
    est_activo tinyint(1)   null,
    est_origen varchar(255) null,
    est_nombre varchar(255) null
 */

@Entity({name: 'Estado'})
export class Status{

    @PrimaryGeneratedColumn()
    est_id: number;

    @Column({nullable: true})
    est_activo: boolean;

    @Column({nullable: true})
    est_origen: string;

    @Column({nullable: true})
    est_nombre: string; 
}