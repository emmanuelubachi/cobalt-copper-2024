export type kpiTrendProps = {
  date: string;
  quantity: number;
  transaction: number;
  product: string;
}[];
export type xhistoryProps = {
  exporter: string;
  quantity: number;
};

export type OverviewDestinationSummary = {
  short_destination: string;
  long_destination: string;
  quantity: number;
  transaction: number;
};

export type quantityTrendProps = {
  date: string;
  quantity: number;
  product: string;
}[];

export type transactionTrendProps = {
  date: string;
  transaction: number;
  product: string;
}[];

export type InputData = {
  date: string;
  quantity?: string;
  transaction?: string;
  product: string;
}[];

export type TransformedData = {
  date: string;
  Cobalt?: number;
  Copper?: number;
}[];

export type xShareDataProps = {
  product: string;
  exporter: string;
  quantity: number;
  quantity_percent: number;
  transaction: number;
  transaction_percent: number;
}[];

export type shareDataByCountryProps = {
  product: string;
  country: string;
  quantity: number;
  share: number;
  fill: string;
}[];
