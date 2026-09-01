import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../lib/database/prisma.service';
import type {
  CreateHackathonDto,
  UpdateHackathonDto,
} from './dto/create-hackathon.dto';

export type CreateHackathonInput = CreateHackathonDto;
export type UpdateHackathonInput = UpdateHackathonDto;

@Injectable()
export class HackathonService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly hackathonSelect = {
    id: true,
    name: true,
    description: true,
    startDate: true,
    endDate: true,
    isActive: true,
    authorId: true,
    createdAt: true,
    updatedAt: true,
    _count: { select: { participants: true } },
  } as const;

  findAll() {
    return this.prisma.hackathon.findMany({
      select: this.hackathonSelect,
      orderBy: { startDate: 'asc' },
    });
  }

  async findById(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
      select: this.hackathonSelect,
    });

    if (!hackathon) {
      throw new NotFoundException(`Hackathon with id ${id} not found`);
    }

    return hackathon;
  }

  create(input: CreateHackathonInput, authorId: string) {
    return this.prisma.hackathon.create({
      data: {
        name: input.name,
        description: input.description,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
        isActive: input.isActive,
        authorId,
      },
      select: this.hackathonSelect,
    });
  }

  async update(id: string, input: UpdateHackathonInput) {
    await this.findById(id);

    return this.prisma.hackathon.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        endDate: input.endDate ? new Date(input.endDate) : undefined,
        isActive: input.isActive,
      },
      select: this.hackathonSelect,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.hackathon.delete({ where: { id } });
    return { id };
  }

  async join(id: string, userId: string) {
    const hackathon = await this.findById(id);
    const now = new Date();

    if (
      !hackathon.isActive ||
      hackathon.startDate > now ||
      hackathon.endDate < now
    ) {
      throw new ConflictException('Hackathon is not currently active');
    }

    try {
      return await this.prisma.hackathonParticipant.create({
        data: { hackathonId: id, userId },
        select: { id: true, hackathonId: true, userId: true, createdAt: true },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already joined this hackathon');
      }
      throw error;
    }
  }
}
