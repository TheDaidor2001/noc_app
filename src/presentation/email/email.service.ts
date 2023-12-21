import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';


interface SendMailoptions {
    to: string | string[];
    subject:string;
    htmlBody: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}

    async sendEmail(options: SendMailoptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            const log = new LogEntity({
                level: LogServerityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            })
        

            return true
        } catch (error) {

            const log = new LogEntity({
                level: LogServerityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            })
           
            return false
        }
    }

    async sendEmailWithAttachment(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
              <h3>Logs de sistema - NOC </h3>
              <p>lorem ipsum lorem sit amet lorem asuet</p>
              <p>Ver adjuntos</p>
          `;
        const attachments: Attachment[]  = [
            {filename: 'logs-low.log', path: '/logs/logs-low.log'},
            {filename: 'logs-medium.log', path: '/logs/logs-medium.log'},
            {filename: 'logs-high.log', path: '/logs/logs-high.log'}
        ]

        return this.sendEmail({to, subject, htmlBody, attachments})

    }

}