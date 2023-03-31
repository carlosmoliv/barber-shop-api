import MailProviderInMemory from "../../../../../src/shared/infra/container/MailProvider/in-memory/MailProviderInMemory";

describe("MailProviderInMemory", () => {
  it("should add mail to mails array when sendMail is called", async () => {
    const mailProvider = new MailProviderInMemory();

    const mailData = {
      to: "example@example.com",
      subject: "Test email",
      body: "This is a test email",
    };

    await mailProvider.sendMail(mailData);

    expect(mailProvider.getAllMails()).toHaveLength(1);
  });

  it("should return all mails when getAllMails is called", () => {
    const mailProvider = new MailProviderInMemory();

    const mailData = {
      to: "example@example.com",
      subject: "Test email",
      body: "This is a test email",
    };

    mailProvider.sendMail(mailData);
    expect(mailProvider.getAllMails()).toMatchObject([mailData]);
  });
});
