// src/scraping/scraping.module.ts
import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { ScrapingController } from './scraping.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from '../schemas/result.schema';

@Module({
  imports: [
    // Register the Result schema
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
  ],
  controllers: [ScrapingController],
  providers: [ScrapingService],
})
export class ScrapingModule {}
