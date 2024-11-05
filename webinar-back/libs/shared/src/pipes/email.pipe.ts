import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class emailPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!value.match(emailRegex)){
            throw new BadRequestException("Invalid email");
        }
        return value;
    }
}