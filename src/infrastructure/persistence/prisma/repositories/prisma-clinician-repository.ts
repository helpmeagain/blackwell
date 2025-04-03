import { ClinicianRepository } from "@/application/repositories/clinician-repository";
import { Clinician } from "@/domain/entities/clinician";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaClinicianMapper } from "../mappers/prisma-clinician-mapper";
import { PaginationParams } from "@/application/common/pagination-params";
import { CacheRepository } from "@/infrastructure/cache/cache-repository";

@Injectable()
export class PrismaClinicianRepository implements ClinicianRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository
  ) {}

  async findById(id: string): Promise<Clinician | null> {
    const cacheHit = await this.cache.get(`clinician:${id}`);

    if (cacheHit) {
      const cachedData = JSON.parse(cacheHit);
      const clinician = PrismaClinicianMapper.toDomain(cachedData);
      return clinician;
    }
    
    const clinician = await this.prisma.clinician.findUnique({
      where: { id },
    });

    if (!clinician) {
      return null;
    }

    const clinicianToDomain = PrismaClinicianMapper.toDomain(clinician);
    const persistenceData =
      PrismaClinicianMapper.toPersistence(clinicianToDomain);
    await this.cache.set(
      `clinician:${clinicianToDomain.id}`,
      JSON.stringify(persistenceData)
    );

    return PrismaClinicianMapper.toDomain(clinician);
  }

  async findByEmail(email: string): Promise<Clinician | null> {
    const clinician = await this.prisma.clinician.findUnique({
      where: { email },
    });

    if (!clinician) {
      return null;
    }

    return PrismaClinicianMapper.toDomain(clinician);
  }

  async findBySlug(slug: string): Promise<Clinician[]> {
    const clinicians = await this.prisma.clinician.findMany({
      where: {
        slug: {
          contains: slug,
        },
      },
    });

    if (!clinicians.length) {
      return [];
    }

    return clinicians.map(PrismaClinicianMapper.toDomain);
  }

  async findMany({ page, orderBy }: PaginationParams): Promise<Clinician[]> {
    const clinician = await this.prisma.clinician.findMany({
      orderBy: orderBy
        ? { [orderBy.field]: orderBy.direction }
        : { createdAt: "desc" },
      take: 20,
      skip: (page - 1) * 20,
    });

    return clinician.map(PrismaClinicianMapper.toDomain);
  }

  async create(clinician: Clinician): Promise<void> {
    const data = PrismaClinicianMapper.toPersistence(clinician);
    await this.prisma.clinician.create({ data });
  }

  async save(clinician: Clinician): Promise<void> {
    const data = PrismaClinicianMapper.toPersistence(clinician);
    await Promise.all([
      this.prisma.clinician.update({ where: { id: data.id }, data }),
      this.cache.delete(`clinician:${data.id}`),
    ]);
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.prisma.clinician.update({
      where: { id },
      data: { password },
    });
  }

  async delete(clinician: Clinician): Promise<void> {
    const data = PrismaClinicianMapper.toPersistence(clinician);
    await this.prisma.clinician.delete({ where: { id: data.id } });
  }
}
