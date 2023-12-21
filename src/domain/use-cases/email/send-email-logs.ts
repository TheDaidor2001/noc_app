import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogServerityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"




interface sendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class sendEmailLogs implements sendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}


    async execute(to: string | string[]) {

        try {
         const sent = await this.emailService.sendEmailWithAttachment(to)
         if(!sent) {
            throw new Error('Email log not sent')
        }

        const log = new LogEntity({
            level: LogServerityLevel.low,
            message: `Log email sent`,
            origin: 'send-email-logs.ts'
        })

        this.logRepository.saveLog(log)

        return true

        } catch (error) {
            const log = new LogEntity({
                level: LogServerityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts'
            })

            this.logRepository.saveLog(log)
            
            return false
        }
    }


}