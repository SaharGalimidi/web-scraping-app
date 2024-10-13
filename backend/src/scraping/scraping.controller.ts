// src/scraping/scraping.controller.ts

import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('scrape')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  // Endpoint to start scraping
  @Post()
  async scrapeWebsite(@Body('url') url: string) {
    if (!url) {
      throw new HttpException('URL is required.', HttpStatus.BAD_REQUEST);
    }

    return await this.scrapingService.scrapeWebsite(url);
  }

  // Endpoint to get all results
  @Get()
  async getResults() {
    return await this.scrapingService.getResults();
  }
}
