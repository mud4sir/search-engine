export interface Item {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    createdAt: Date;
  }
  
  export interface SearchQuery {
    q?: string;
    sortBy?: "relevance" | "price" | "createdAt";
    sortOrder?: "asc" | "desc";
    category?: string;
    page?: string;
    limit?: string;
  }
  
  export interface SearchResponse {
    results: Item[];
    total: number;
    page: number;
    limit: number;
  }
