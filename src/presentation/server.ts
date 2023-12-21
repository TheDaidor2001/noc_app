
import { CheckService } from "../domain/use-cases/checks/check-service";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-sistem.datasource";
import { LogRepositoryImpl } from "../infraestructure/datasources/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)


const emailServie = new EmailService()

export class Server {

    public static start() {

        console.log('Server started');

        //Mandar mail

        new sendEmailLogs(
            emailServie,
            fileSystemLogRepository
        ).execute(
            ['danielcastillobalboa@gmail.com','maxidaidor@gmail.com']
        )
       
        // emailServie.sendEmailWithAttachment(
        //     ['danielcastillobalboa@gmail.com','maxidaidor@gmail.com']
        // )
        
          
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //        new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${url} is OK`),
        //         (error) => console.log(error)
        //        ).execute(url) 
        //     }
        // )
        
        
    }

}