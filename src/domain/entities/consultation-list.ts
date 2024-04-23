import { WatchedList } from '../common/watched-list';
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

export class ConsultationIdList extends WatchedList<UniqueEntityId> {
  compareItems(a: UniqueEntityId, b: UniqueEntityId): boolean {
    return a.equals(b);
  }
}
