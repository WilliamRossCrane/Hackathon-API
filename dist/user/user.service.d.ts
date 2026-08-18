import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface User {
    id: number;
    name: string;
    email: string;
}
export declare class UserService {
    private readonly logger;
    constructor(logger: LoggerService);
    private users;
    findAllUsers(name?: string): User[];
    findOneUser(id: number): User;
    createUser(dto: CreateUserDto): User;
    updateUser(id: number, dto: UpdateUserDto): User | null;
    deleteUser(id: number): User | null;
}
