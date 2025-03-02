export interface Casino {
  id: string;
  name: string;
  point: number;
  owner: string;
  operator: string;
  establishedDate: string;
  annualRevenue: string;
  casinoLogoNameOnDisk: string;
  description: string;
  casinoInternalAddress: string;
  casinoExternalAddress: string;
  bonusDetailHtml: string;
  
  paymentMethods: PaymentMethod[];
  licences: Licence[];
  gameTypes: GameType[];
  languages: Language[];
  providers: Provider[];
  screenShots: ScreenShot[];
  positives: Positive[];
  negatives: Negative[];
  interestedFacts: InterestedFact[];
  withdrawLimits: WithdrawLimit[];
  noDepositBonuses: NoDepositBonus[];
  depositBonuses: DepositBonus[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  imageNameOnDisc: string;
}

export interface Licence {
  id: string;
  name: string;
  imageNameOnDisc: string;
}

export interface GameType {
  id: string;
  name: string;
  imageNameOnDisc: string;
}

export interface Language {
  id: string;
  name: string;
  imageNameOnDisc: string;
}

export interface Provider {
  id: string;
  name: string;
  imageNameOnDisc: string;
}

export interface ScreenShot {
  id: string;
  name: string;
  imageNameOnDisc: string;
}

export interface Positive {
  id: string;
  detail: string;
}

export interface Negative {
  id: string;
  detail: string;
}

export interface InterestedFact {
  id: string;
  detail: string;
}

export interface WithdrawLimit {
  id: string;
  detail: string;
}

export interface NoDepositBonus {
  id: string;
  detail: string;
}

export interface DepositBonus {
  id: string;
  detail: string;
}

export interface CasinoListResponse {
  casinos: Casino[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  pageSize: number;
}

export interface CasinoFilter {
  pageSize?: number;
  pageNumber?: number;
  searchTerm?: string;
  licenceId?: string;
  providerId?: string;
  gameTypeId?: string;
  languageId?: string;
  paymentMethodId?: string;
}
