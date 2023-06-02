import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

const nestMenu = (menuData) => {

    let nestedMenuT = [];

    for (const key in menuData) {
        const menu = menuData[key];
        const trueKey = menu.men_id;
        const parentId = menu.men_idpadre;

        const { children, ...menuWithoutChildren } = menu;

        if (!parentId) {
            // Root level menu item
            nestedMenuT.push({ ...menuWithoutChildren, children: [] });
        } else {
            const parentItem = nestedMenuT.find(item => item.men_id === parentId);
            parentItem.children.push({ ...menuWithoutChildren });
        }
    }

    return nestedMenuT;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }


    async login(user: LoginAuthDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                usu_cuenta: user.email
            }
        });

        if (!userFound) {
            return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
        }
        //const isCheck = await compareHash(password, userFound.password);
        const isCheck = user.password === userFound.usu_clave;

        if (!isCheck) {
            return new HttpException('La contraseña es incorrecta', HttpStatus.CONFLICT);
        }

        const [resp] = await this.userRepository.query(`CALL USP_Usuario_Auth('${user.email}')`);

        const userData = {...resp[0]};

        if (userData.est_nombre === 'Inactivo') {
            return new HttpException('El usuario se encuentra inactivo', HttpStatus.CONFLICT);
        }

        const [menuData] = await this.userRepository.query(`CALL USP_Menu_List('${userData.rol_id}')`);

        const nestedMenuData = nestMenu(menuData);

        const payload = {
            userInfo: {
                id: userData.usu_id,
                cuenta: userData.usu_cuenta,
                nombre: userData.usu_nom,
                fechacreacion: userData.usu_feccrea,
                fechavencimientoclave: userData.usu_fecvncto,
                estado: userData.est_nombre,
                rol: userData.rol_nom,
                id_rol: userData.rol_id
            },
            companyInfo: {
                id: userData.emp_id,
                nombre: userData.emp_nom,
                direccion: userData.emp_dir,
                telefono: userData.emp_telef,
                pais: userData.pai_nom
            },
            menuInfo: nestedMenuData
        };

        const token = this.jwtService.sign(payload);

        const data = {
            ...payload,
            accessToken: token
        };

        return data;
    }
}
