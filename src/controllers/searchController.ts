import { Request, Response } from "express";
import { ItemModel } from "@/models/Item";
import { SearchQuery, SearchResponse } from "@/types";
import logger from "@/utils/logger";

export const searchItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      q,
      sortBy = "relevance",
      sortOrder = sortBy === "price" ? "asc" : "desc",
      category,
      page = "1",
      limit = "10",
    } = req.query as SearchQuery;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    if (pageNum < 1 || limitNum < 1) {
      logger.warn("Invalid page or limit", { page, limit });
      res.status(400).json({ error: "Invalid page or limit" });
      return;
    }

    const query: any = {};
    if (q) {
      query.$text = { $search: q };
    }
    if (category) {
      query.category = category;
    }

    let sort: any = {};
    if (sortBy === "relevance" && q) {
      sort = { score: { $meta: "textScore" } };
    } else if (sortBy === "price") {
      sort = { price: sortOrder === "asc" ? 1 : -1 };
    } else if (sortBy === "createdAt") {
      sort = { createdAt: sortOrder === "asc" ? 1 : -1 };
    }

    logger.info("Executing search", { query: q, sortBy, sortOrder });
    const items = await ItemModel.find(query, {
      score: q ? { $meta: "textScore" } : undefined,
    })
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const total = await ItemModel.countDocuments(query);

    const response: SearchResponse = {
      results: items,
      total,
      page: pageNum,
      limit: limitNum,
    };

    logger.info("Search completed", { query: q, results: items.length });
    res.status(200).json(response);
  } catch (error) {
    logger.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
