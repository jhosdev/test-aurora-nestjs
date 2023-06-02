/**
 * base model for country:
 * create table Pais
(
    pai_id  int auto_increment
        primary key,
    pai_nom varchar(255) null,
    est_id  int          null,
    constraint Pais_ibfk_1
        foreign key (est_id) references Estado (est_id)
);

create index est_id
    on Pais (est_id);
*/

import { Status } from 'src/status/status.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'Pais' })
export class Country {

    @PrimaryGeneratedColumn()
    pai_id: number;

    @Column({ nullable: true })
    pai_nom: string;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'est_id' })
    status: Status;
}