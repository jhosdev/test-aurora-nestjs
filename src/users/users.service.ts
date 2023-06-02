import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(user: CreateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                usu_cuenta: user.usu_cuenta
            }
        })

        if (userFound) {
            return new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
        }

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers() {
        return this.userRepository.find({
            select: {
                usu_id: true,
                usu_cuenta: true,
                usu_nom: true,
                usu_feccrea: true,
                usu_fecvncto: true,
                est_id: true
            }
        });
    }

    async getUser(usu_id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                usu_id
            }
        });

        if (!userFound) {
            return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }

        delete userFound.usu_clave;

        return userFound;
    }

    async deleteUser(usu_id: number) {
        const result = await this.userRepository.delete({ usu_id });

        if (result.affected === 0) {
            return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateUser(usu_id: number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                usu_id
            }
        });

        if (!userFound) {
            return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }

        const updatedUser = Object.assign(userFound, user);

        return this.userRepository.save(updatedUser);
    }
}   
