import uniqueEntityId from "../valueObjects/uniqueEntityId/uniqueEntityId";

class baseEntity<Props> {
  private _id: uniqueEntityId;
  protected props: Props;

  constructor (props: Props, id?: string) {
    this.props = props;
    this._id = new uniqueEntityId(id);
  }

  get id(): uniqueEntityId {
    return this._id;
  }
}

export default baseEntity;