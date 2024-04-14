import { Controller, Get } from '@nestjs/common';
import { cacheService } from 'src/cache-data/cache.provider';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('FX Rates')
@Controller('fx-rates')
export class fxRatesController {
  private lastQuoteIdRequestTime: number = 0; // Track the last time a quote ID was requested
  private existingQuoteId: { id: string; expiresAt: number } | null = null; // Track the existing quote ID and its expiration time

  constructor(private readonly fxService: cacheService) {}

  @Throttle({default:{limit:30, ttl:60000}})
  @Get()
  async getAllRates() {
    const currentTime = Date.now();
    // Check if 60 seconds have passed since the last quote ID request or if no existing quote ID is available
    if (currentTime - this.lastQuoteIdRequestTime >= 60000 || !this.existingQuoteId) {
      this.lastQuoteIdRequestTime = currentTime;
      const quoteId = await this.fxService.generateQuoteId(); 
      this.existingQuoteId = { id: quoteId, expiresAt: currentTime + 60000 }; 
    }

    const rates = this.fxService.getAllRates(this.existingQuoteId!.id); 
    return { quoteId: this.existingQuoteId!.id, expiresAt: this.existingQuoteId!.expiresAt, rates };
  }
}
