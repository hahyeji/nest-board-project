import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Board} from "../boards/board.entity";

@Entity()
@Unique(['username'])   // unique 등록 ?
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()   //primarykey 등록
    id : number

    @Column()
    username : string

    @Column()
    password : string

    @OneToMany(type => Board, board => board.user, { eager : true })
    boards : Board[]
}