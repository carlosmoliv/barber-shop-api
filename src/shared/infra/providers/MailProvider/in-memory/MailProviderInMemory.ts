import { ISendMailDTO } from "../dtos/SendMailDTO";
import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private mails: ISendMailDTO[] = [];

  async sendMail(data: ISendMailDTO): Promise<void> {
    this.mails.push(data);
  }

  getAllMails(): ISendMailDTO[] {
    return this.mails;
  }
}

export default MailProviderInMemory;
