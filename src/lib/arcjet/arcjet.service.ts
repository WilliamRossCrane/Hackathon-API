import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/node';

@Injectable()
export class ArcjetService {
  private readonly logger = new Logger(ArcjetService.name);
  private readonly arcjetClient: ReturnType<typeof arcjet> | null;

  constructor(private readonly configService: ConfigService) {
    const key = this.configService.get<string>('ARCJET_KEY');
    const mode = this.configService.get<string>('ARCJET_MODE', 'DRY_RUN');

    if (!key) {
      this.logger.warn(
        'ARCJET_KEY is not configured. Arcjet protection is disabled.',
      );
      this.arcjetClient = null;
      return;
    }

    const liveMode = mode === 'LIVE' ? 'LIVE' : 'DRY_RUN';

    this.arcjetClient = arcjet({
      key,
      rules: [
        shield({ mode: liveMode }),
        detectBot({
          mode: liveMode,
          allow: ['CATEGORY:SEARCH_ENGINE'],
        }),
        tokenBucket({
          mode: liveMode,
          refillRate: 10,
          interval: 60,
          capacity: 30,
        }),
      ],
    });
  }

  get isEnabled(): boolean {
    return Boolean(this.arcjetClient);
  }

  async protect(req: any): Promise<any | null> {
    if (!this.arcjetClient) {
      return null;
    }

    return this.arcjetClient.protect(req);
  }
}
