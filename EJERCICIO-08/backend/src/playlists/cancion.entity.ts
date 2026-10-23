import { Column,Entity,ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity('canciones')
export class Cancion {
 @PrimaryGeneratedColumn() id:number;
 @Column() titulo:string;
 @Column() artista:string;
 @Column({type: 'int', default: 0}) playlistId:number;

 // ManyToOne es el lado que almacena la clave foránea.
 @ManyToOne(()=>Playlist,(playlist)=>playlist.canciones,{onDelete:'CASCADE'})
 playlist:Playlist;
}