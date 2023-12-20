import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-sistem.datasource";
import { LogRepositoryImpl } from "../infraestructure/datasources/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
)



export class Server {

    public static start() {

        console.log('Server started');

          
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://localhost:3000'
               new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
               ).execute(url) 
            }
        )
        
        
    }

}