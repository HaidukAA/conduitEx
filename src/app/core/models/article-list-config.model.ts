export interface ArticleListConfig {
  filters: {
    [key: string]: string | number | undefined;
  };
  type: string;
}
