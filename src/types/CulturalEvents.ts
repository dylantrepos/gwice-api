export type WhenQuery = 'today' | 'week' | 'weekend' | 'month' | 'default';

export interface CulturalEvent {
  longDescription: { [key: string]: string };
  country: { [key: string]: string };
  interetintercommunal: number[];
  featured: boolean;
  private: number;
  keywords: {};
  accessibility: { [key: string]: boolean };
  dateRange: { [key: string]: string };
  timezone: string;
  imageCredits: string | null;
  originAgenda: {
    uid: number;
    image: string;
    title: string;
  };
  description: { [key: string]: string };
  title: { [key: string]: string };
  onlineAccessLink: string | null;
  createdAt: string;
  uid: number;
  draft: number;
  timings: {
    begin: string;
    end: string;
  }[];
  firstTiming: {
    begin: string;
    end: string;
  };
  links: [];
  state: number;
  'categories-metropolitaines':  Category[];
  slug: string;
  updatedAt: string;
  addMethod: string;
  image: {
    filename: string;
    size: {
      width: number;
      height: number;
    };
    variants: {
      filename: string;
      size: {
        width: number;
        height: number;
      };
      type: string;
    }[];
    base: string;
  };
  attendanceMode: number;
  sourceAgendas: {
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
  }[];
  label: [];
  creatorUid: number;
  recurringevent: [];
  lastTiming: {
    begin: string;
    end: string;
  };
  registration: {
    type: string;
    value: string;
  }[];
  location: {
    disqualifiedDuplicates: null;
    access: {};
    city: string;
    timezone: string;
    postalCode: string;
    latitude: number;
    imageCredits: string | null;
    description: {};
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
  };
  ownerUid: number;
  conditions: { [key: string]: string };
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

interface Category {
  id: number;
  label: {
    fr: string;
    en: string;
  };
}


export interface CategoryOption {
  id: number;
  value: string;
  label: {
    fr: string;
    en: string;
  };
  info: null | string;
  display: boolean;
  "categories-metropolitaines": Category[];
}

interface CategoryField {
  field: string;
  label: {
    fr: string;
    en: string;
  };
  info: null | string;
  sub: null | string;
  placeholder: null | string;
  write: null | string;
  read: null | string;
  optional: boolean;
  display: boolean;
  enable: boolean;
  origin: string;
  enableWith: null | string;
  optionalWith: null | string;
  related: {
    enable: string[];
    optional: string[];
    other: string[];
  };
  selfHandled: string[];
  min: null | string;
  max: null | string;
  options: CategoryOption[];
  fieldType: string;
  schemaId: number;
  schemaType: string;
}

interface Schema {
  custom: Record<string, unknown>;
  fields: CategoryField[];
}

export interface Agenda {
  uid: number;
  title: string;
  description: string;
  slug: string;
  url: string;
  official: number;
  networkUid: number;
  locationSetUid: null | string;
  updatedAt: string;
  createdAt: string;
  memberSchemaId: null | string;
  officializedAt: string;
  image: string;
  private: number;
  indexed: number;
  schema: Schema;
}

export type EventsCategory = 
  "atelier" |
  "braderie-brocante" |
  "ceremonie" |
  "cinema" |
  "conference-rencontre" |
  "conseil-municipal" |
  "danse" |
  "developpement-durable" |
  "emploi" |
  "exposition" |
  "fete-festival" |
  "formation" |
  "lecture" |
  "mode" |
  "musique" |
  "reunion-publique" |
  "sante" |
  "spectacle" |
  "sport" |
  "theatre" |
  "visite-balade" |
  "aucune";