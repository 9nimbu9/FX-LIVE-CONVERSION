import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Post('topup')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 100 },
        currency: { type: 'string', example: 'USD' }
      },
      required: ['amount', 'currency']
    }
  })
  topUp(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    this.accountService.topUp(amount, currency);
  }


  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Post('low')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 50 },
        currency: { type: 'string', example: 'USD' }
      },
      required: ['amount', 'currency']
    }
  })
  low(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    try {
      this.accountService.deduct(amount, currency);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get('balance')
  getBalance() {
    return this.accountService.getAllBalances();
  }
}
