import uniqueEntityId from "@entities/valueObjects/uniqueEntityId/uniqueEntityId";

class baseEntity<Props> {
  private _id: uniqueEntityId;
  protected props: Props;

  protected constructor (props: Props, id?: uniqueEntityId) {
    this.props = props;
    this._id = id ?? new uniqueEntityId(id);
  }

  get id(): uniqueEntityId {
    return this._id;
  }
}

export default baseEntity;