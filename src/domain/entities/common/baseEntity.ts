import UniqueEntityId from '@entities/valueObjects/uniqueEntityId/uniqueEntityId';

class baseEntity<Props> {
  private readonly _id: UniqueEntityId;
  protected props: Props;

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }

  get id(): UniqueEntityId {
    return this._id;
  }
}

export default baseEntity;
