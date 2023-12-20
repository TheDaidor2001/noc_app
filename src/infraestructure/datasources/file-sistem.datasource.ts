import fs from 'node:fs'
import { LogDatasource } from "../../domain/datosurces/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";





export class FileSystemDatasource implements LogDatasource {


    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-low.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles()
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogPath,
            this.mediumLogPath,
            this.highLogPath
        ].forEach(path => {
            if(fs.existsSync(path)) return
            fs.writeFileSync(path, '')
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`
        
        fs.appendFileSync(this.allLogPath, logAsJson)

        if(newLog.level === LogServerityLevel.low) return

        if(newLog.level === LogServerityLevel.medium) {
            fs.appendFileSync(this.mediumLogPath, logAsJson)
        }else {
            fs.appendFileSync(this.highLogPath, logAsJson)
        }

    }

    private getLogFromFile = (path: string): LogEntity[] => {

        const content = fs.readFileSync(path, 'utf8');
        const logs = content.split('\n').map(log => LogEntity.fromJson(log))

        return logs;

    }

    async getLogs(serverityLevel: LogServerityLevel): Promise<LogEntity[]> {
        switch(serverityLevel) {
            case LogServerityLevel.low:
                return this.getLogFromFile(this.allLogPath);
            case LogServerityLevel.medium:
                return this.getLogFromFile(this.mediumLogPath);
            case LogServerityLevel.high:
                return this.getLogFromFile(this.highLogPath);
            default:
                throw new Error(`${serverityLevel} not implemented`);
        }
    }

}