import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(name: string): import("./user.service").User[];
    getUserById(id: number): import("./user.service").User;
    createUser(createUserDto: CreateUserDto): import("./user.service").User;
    updateUser(id: string, updateUserDto: UpdateUserDto): import("./user.service").User | null;
    deleteUser(id: string): import("./user.service").User | null;
}
