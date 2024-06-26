interface Image {
  filename: string;
  size: {
    width: number;
    height: number;
  };
  variants: ImageVariant[];
  base: string;
}

interface ImageVariant {
  filename: string;
  size: {
    width: number;
    height: number;
  };
  type: string;
}

interface Location {
  disqualifiedDuplicates: null;
  access: Record<string, unknown>;
  city: string;
  timezone: string;
  postalCode: string;
  latitude: number;
  imageCredits: string | null;
  description: Record<string, unknown>;
  setUid: number | null;
  uid: number;
  createdAt: string;
  duplicateCandidates: null;
  countryCode: string;
  adminLevel5: null;
  links: [];
  state: number;
  extId: null;
  department: string;
  slug: string;
  email: string | null;
  longitude: number;
  updatedAt: string;
  image: null;
  website: string | null;
  address: string;
  adminLevel3: string;
  agendaUid: number;
  adminLevel4: string;
  adminLevel1: string;
  adminLevel2: string;
  mergedIn: null;
  _agg: string;
  tags: null;
  insee: string;
  phone: string | null;
  district: null;
  name: string;
  region: string;
}

interface CategoryOption {
  id: number;
  value: string;
  label: {
    fr: string;
    en: string;
  };
  info: null | string;
  display: boolean;
}

type Description = Record<string, string>;

type SourceAgenda = Array<{
  image: string;
  private: number;
  indexed: number;
  locationSetUid: number | null;
  official: number;
  description: string;
  title: string;
  url: string | null;
  _agg: string;
  uid: number;
  createdAt: string;
  officializedAt: string;
  slug: string;
  updatedAt: string;
}>;

export interface CityEventDetailsRequest {
  total: number;
  events: CityEventDetails[];
  sort: string;
  after: string[];
}

export interface Timing {
  begin: string;
  end: string;
}

interface Category {
  id?: number;
  title: string;
  open_agenda_id: number;
}

export interface CityEventDetails {
  longDescription: Record<string, string>;
  country: Record<string, string>;
  interetintercommunal: number[];
  featured: boolean;
  private: number;
  keywords: Record<string, unknown>;
  accessibility: Record<string, boolean>;
  dateRange: Record<string, string>;
  timezone: string;
  imageCredits: string | null;
  originAgenda: {
    uid: number;
    image: string;
    title: string;
  };
  description: Record<string, string>;
  title: Record<string, string>;
  onlineAccessLink: string | null;
  createdAt: string;
  uid: number;
  draft: number;
  timings: Array<Timing>;
  firstTiming: Timing;
  links: Array<Record<"link", string>>;
  state: number;
  "categories-metropolitaines": number[];
  slug: string;
  updatedAt: string;
  addMethod: string;
  image: Image;
  attendanceMode: number;
  sourceAgendas: SourceAgenda;
  label: string[];
  creatorUid: number;
  recurringevent: [];
  lastTiming: Timing;
  registration: Array<{
    type: string;
    value: string;
  }>;
  category: CategoryOption[];
  location: Location;
  ownerUid: number;
  conditions: Record<string, string>;
  age: {
    min: number | null;
    max: number | null;
  };
  status: number;
  nextTiming: {
    begin: string;
    end: string;
  };
}

export interface CityEventReturn {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  price: string | null;
  image_url: string;
  minimum_age: number;
  status: number;
  state: number;
  nextTiming: Timing;
  location: {
    adress: string | null;
    city: string | null;
    postal_code: string | null;
  };
  registration: {
    link: string | null;
    email: string | null;
    phone: string | null;
  };
  category: Category[];
  openAgenda: {
    uid: string | null;
    creator_uid: string | null;
    open_agenda_created_at: Date | null;
    open_agenda_updated_at: Date | null;
  } | null;
  timings: Timing[];
  createdAt: string;
  updatedAt: string;
}

export interface CityEventListReturn {
  total: number;
  events: CityEventReturn[];
  nextPage: number | null;
}
