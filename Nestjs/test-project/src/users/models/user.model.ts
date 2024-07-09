import {Column, Model, Table, HasMany} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';

@Table
export class User extends Model {
    @Column
    username: string;

    @Column
    email: string;

    @HasMany(() => Post)
    post: Post[];
}