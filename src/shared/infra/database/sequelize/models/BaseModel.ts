import { Column, CreatedAt, Model, UpdatedAt } from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";

export class BaseModel extends Model {
  @Column({ primaryKey: true })
  id: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updateAt: Date;

  constructor() {
    super();

    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
