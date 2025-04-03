import { EnvService } from "@/infrastructure/env/env.service";
import { Injectable, OnModuleDestroy, Logger } from "@nestjs/common";
import { Redis, RedisOptions } from "ioredis";

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly maxRetries = 20;

  constructor(envService: EnvService) {
    const options: RedisOptions = {
      host: envService.get("REDIS_HOST"),
      port: Number(envService.get("REDIS_PORT")),
      db: Number(envService.get("REDIS_DB")),
      retryStrategy: (times) => {
        if (times >= this.maxRetries) {
          throw new Error("Falha ao conectar ao Redis após várias tentativas.");
        }
        const delay = Math.min(times * 1000, 10000);
        return delay;
      },
    };

    super(options);

    this.on("error", (err) => {
      this.logger.error(`Erro no Redis: ${err.message}`);
    });

    this.on("connect", () => {
      this.logger.log("Conectado ao Redis com sucesso.");
    });
  }

  async onModuleDestroy() {
    this.logger.log("Desconectando do Redis...");
    await this.quit();
  }
}
