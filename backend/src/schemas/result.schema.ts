// src/schemas/result.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// This interface represents a document in MongoDB
export type ResultDocument = Result & Document; 

// The @Schema decorator marks this class as a Mongoose schema
@Schema()
export class Result {
  // The URL that was scraped
  @Prop({ required: true })
  url: string;

  // The date and time when the scraping occurred
  @Prop({ default: Date.now })
  date: Date;

  // An array of domains found during scraping
  @Prop({ type: [String], default: [] })
  domains: string[];

  // An array of URLs found during scraping
  @Prop({ type: [String], default: [] })
  urls: string[];

  // The number of unique domains found
  @Prop({ default: 0 })
  domainCount: number;

  // The number of URLs found
  @Prop({ default: 0 })
  urlCount: number;
}

// Create the schema from the class
export const ResultSchema = SchemaFactory.createForClass(Result);
