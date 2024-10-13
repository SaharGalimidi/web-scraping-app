// backend/src/scraping/scraping.service.ts

// Import necessary modules and decorators
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios'; // For making HTTP requests
import * as cheerio from 'cheerio'; // For parsing HTML
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result, ResultDocument } from '../schemas/result.schema'; // Import the Result schema and document type

/**
 * The ScrapingService class contains the business logic for scraping websites
 * and interacting with the MongoDB database.
 */
@Injectable()
export class ScrapingService {
  /**
   * The constructor injects the Result model to interact with the database.
   * @param resultModel - The injected Mongoose model for Result documents.
   */
  constructor(
    @InjectModel(Result.name) private resultModel: Model<ResultDocument>,
  ) {}

  /**
   * Scrapes the provided website URL to extract all domains and URLs.
   * @param websiteUrl - The URL of the website to scrape.
   * @returns A Promise that resolves to the saved Result document.
   */
  async scrapeWebsite(websiteUrl: string): Promise<Result> {
    try {
      // Make an HTTP GET request to fetch the website content
      const response = await axios.get(websiteUrl);

      // Load the HTML content into Cheerio for parsing
      const $ = cheerio.load(response.data);

      // Initialize arrays to store URLs and a set to store unique domains
      const urls: string[] = [];
      const domains: Set<string> = new Set();

      // Select all <a> tags and iterate over them
      $('a').each((index, element) => {
        // Get the href attribute value
        const href = $(element).attr('href');

        if (href) {
          // Resolve relative URLs to absolute URLs
          const absoluteUrl = new URL(href, websiteUrl).href;

          // Add the URL to the urls array
          urls.push(absoluteUrl);

          // Extract the domain from the URL
          const domain = new URL(absoluteUrl).hostname;

          // Add the domain to the domains set (to ensure uniqueness)
          domains.add(domain);
        }
      });

      // Create a new Result document with the collected data
      const result = new this.resultModel({
        url: websiteUrl,
        date: new Date(),
        domains: Array.from(domains), // Convert the set to an array
        urls: urls,
        domainCount: domains.size, // Number of unique domains
        urlCount: urls.length, // Total number of URLs
      });

      // Save the Result document to the database and return it
      return await result.save();
    } catch (error) {
      // If an error occurs during the process, throw an HTTP exception
      throw new HttpException(
        'Failed to scrape the website.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Retrieves all scraping results from the database.
   * @returns A Promise that resolves to an array of Result documents.
   */
  async getResults(): Promise<Result[]> {
    try {
      // Find all results, sort them by date in descending order, and execute the query
      return await this.resultModel.find().sort({ date: -1 }).exec();
    } catch (error) {
      // If an error occurs during retrieval, throw an HTTP exception
      throw new HttpException(
        'Failed to retrieve results.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
