import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";
import {Board} from "./board.entity";

@Controller('boards')
export class BoardsController {
    constructor(private boardService : BoardsService) {}

    @Get()
    getAllBoard() : Promise<Board[]> {
        return this.boardService.getAllBoard()
    }

    @Post("")
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto) : Promise<Board> {
        console.log("createBoard ==> ", createBoardDto)
        return this.boardService.createBoard(createBoardDto)
    }

    @Delete("/:id")
    deleteBoard(@Param("id", ParseIntPipe) id : number) : Promise<void> {
        return this.boardService.deleteBoard(id)
    }

    @Get(":id")
    getBoardById(@Param("id") id : number) : Promise<Board> {
        return this.boardService.getBoardById(id)
    }

    @Patch("/:id/status")
    updateBoardStatus(@Param("id", ParseIntPipe) id : number, @Body("status", BoardStatusValidationPipe) status : BoardStatus) {
        return this.boardService.updateBoardStatus(id, status)
    }
}
