export type BrokenLink = {
  id: number;
  statusCode: number;
  urlId: number;
  link: string;
};

export type URLRecord = {
  id: number;
  url: string;
  title: string;
  htmlVersion: string;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  h4Count: number;
  h5Count: number;
  h6Count: number;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: BrokenLink[];
  hasLoginForm: boolean;
  status: "queued" | "running" | "done" | "error";
};

export type CrawlRequest = {
  address: string;
};

export type Filters = {
  title: string;
  htmlVersion: string;
  internalLinks: string;
  externalLinks: string;
  brokenLinks: string;
  status: string;
};

export type SortKey = keyof URLRecord | null;
export type SortDirection = "asc" | "desc";
