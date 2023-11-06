import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {BoardStatus} from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOption =[
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase()
        if(!this.isStatusValid(value))
            throw new BadRequestException(`${value} isn't is in the status option !`)

        return value;
    }

    private isStatusValid(status : any) {
        return this.StatusOption.indexOf(status) !== -1
    }

}