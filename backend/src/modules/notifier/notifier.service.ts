import { Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { getConfig } from '../../common/config';

export class NotifierService {
    private readonly logger = new Logger(NotifierService.name);
    private readonly resend = new Resend(getConfig('MAILER_API_KEY'));

    sendMail(to: string, subject: string, html: string) {
        this.resend.emails
            .send({
                from: getConfig('MAILER_FROM'),
                to,
                subject,
                html,
            })
            .catch((e) => {
                this.logger.error(`Failed to send email to ${to}: ${e}`);
            });
    }
}
