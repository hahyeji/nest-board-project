import {Injectable, NotFoundException} from '@nestjs/common';
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";

@Injectable()
export class BoardsService {

    // Repository Injection
    constructor(
       @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ) {}

    async getAllBoard() : Promise<Board[]> {
        return this.boardRepository.find()
    }

    async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto)
    }

    async getBoardById(id : number) : Promise<Board> {
        const found = await this.boardRepository.findOneById(id)
        console.log("found ===> ", found)
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found
    }

    async deleteBoard(id : number) : Promise<void> {
        const res = await this.boardRepository.delete(id)
        if(res.affected == 0) throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    async updateBoardStatus(id : number, status : BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id)
        board.status = status
        await this.boardRepository.save(board)
        return board
    }

}