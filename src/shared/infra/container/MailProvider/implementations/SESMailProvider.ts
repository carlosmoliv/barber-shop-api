import { ISendMailDTO } from "../dtos/SendMailDTO";
import { IMailProvider } from "../IMailProvider";

export class SESMailProvider implements IMailProvider {
  async sendMail(data: ISendMailDTO): Promise<void> {}
}
