import { ISendMailDTO } from "./dtos/SendMailDTO";

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
