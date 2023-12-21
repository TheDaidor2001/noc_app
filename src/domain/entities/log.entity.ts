

export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogServerityLevel
    message: string
    createdAt?: Date
    origin: string
}

export class LogEntity {

    public level: LogServerityLevel; 
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor( options: LogEntityOptions ) {
        const {message, level, createdAt = new Date() ,origin} = options
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
        this.origin = origin;
    }

    static fromJson = (json: string) : LogEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json);
        if(!message) {
            throw new Error('message is required')
        }
        if(!level) {
            throw new Error('level is required')
        }
        const log = new LogEntity({message, level, createdAt, origin });

        return log

    }

}


