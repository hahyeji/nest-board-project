import {Injectable, NotFoundException} from '@nestjs/common';
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";
import {User} from "../auth/user.entity";

@Injectable()
export class BoardsService {

    // Repository Injection
    constructor(
       @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ) {}

    async getAllBoard(user : User) : Promise<Board[]> {
        console.log("token user ==> ", user.username)
        //                                                      data-table 명
        const query = this.boardRepository.createQueryBuilder('board')
        query.where('board.userId = :userId', { userId : user.id })
        const boards = await query.getMany()

        console.log(boards)
        return boards
        // return this.boardRepository.find()
    }

    async createBoard(
        createBoardDto : CreateBoardDto,
        user : User
    ) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user)
    }

    async getBoardById(id : number) : Promise<Board> {
        const found = await this.boardRepository.findOneById(id)
        console.log("found ===> ", found)
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found
    }

    async deleteBoard(
        id : number,
        user : User
    ) : Promise<void> {
        // typeorm version upgrade 되서, 모르겠음
        const res = await this.boardRepository.createQueryBuilder().delete().from(Board)
            .where("board.userId = :userId", { userId : user.id })
        // if(res.affected == 0) throw new NotFoundException(`Can't find Board with id ${id}`)
        console.log("del res",res)
    }

    async updateBoardStatus(id : number, status : BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id)
        board.status = status
        await this.boardRepository.save(board)
        return board
    }

}