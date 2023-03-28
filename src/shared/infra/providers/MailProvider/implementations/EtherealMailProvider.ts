import nodemailer, { Transporter } from "nodemailer";
import { logger } from "../../../utils/logger.utils";
import { ISendMailDTO } from "../dtos/SendMailDTO";
import { IMailProvider } from "../IMailProvider";

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((error) => logger.error(error));
  }

  async sendMail({
    to,
    subject,
    body,
    from = "contact@barbershop.com",
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to: to,
      subject: subject,
      html: body,
      from: from,
    });
  }
}
