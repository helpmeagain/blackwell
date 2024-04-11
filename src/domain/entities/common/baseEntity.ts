import { randomUUID } from "crypto";

class baseEntity<Props> {
  private _id: string;
  protected props: Props;

  constructor (props: Props, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }
}

export default baseEntity;