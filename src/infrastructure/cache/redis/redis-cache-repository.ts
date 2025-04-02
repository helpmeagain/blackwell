import { Injectable } from "@nestjs/common";
import { CacheRepository } from "../cache-repository";
import { RedisService } from "./redis.service";

@Injectable()
export class RedisCacheRepository implements CacheRepository {
  constructor(private redis: RedisService) {}
  get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    const oneHour = 60 * 60;
    await this.redis.set(key, value, "EX", oneHour);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
