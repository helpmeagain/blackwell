import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export abstract class BaseEntity<Props> {
  private readonly _id: UniqueEntityId;
  protected props: Props;

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId();
  }

  public equals(entity: BaseEntity<Props>): boolean {
    if (entity === this || entity.id === this.id) {
      return true;
    }
    return false;
  }

  get id(): UniqueEntityId {
    return this._id;
  }
}
