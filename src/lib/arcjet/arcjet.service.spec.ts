jest.mock('@arcjet/node', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    protect: jest.fn().mockResolvedValue({ isDenied: () => false }),
  })),
  detectBot: jest.fn(() => ({ mode: 'DRY_RUN' })),
  shield: jest.fn(() => ({ mode: 'DRY_RUN' })),
  tokenBucket: jest.fn(() => ({ mode: 'DRY_RUN' })),
}));

import { ConfigService } from '@nestjs/config';
import { ArcjetService } from './arcjet.service';

describe('ArcjetService', () => {
  it('disables protection when ARCJET_KEY is missing', async () => {
    const configService = {
      get: jest.fn((key: string, defaultValue?: unknown) => defaultValue),
    } as unknown as ConfigService;

    const service = new ArcjetService(configService);

    expect(service.isEnabled).toBe(false);
    await expect(service.protect({ headers: {} } as any)).resolves.toBeNull();
  });
});
