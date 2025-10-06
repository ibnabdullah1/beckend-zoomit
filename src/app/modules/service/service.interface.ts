import { Types } from "mongoose";

export interface IBanner {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  sub_title: string;
  description: string;
  background_image: string;
  buttons: {
    text: string;
    link: string;
  }[];
}

export interface IPickup_corner {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  buttons: {
    text: string;
    link: string;
  }[];
}
export interface ISuccessMeter {
  serial_no?: number;
  is_hidden?: boolean;
  title: string;
  description: string;
  options: {
    icon: string;
    title: string;
    sort_description: string;
  }[];
}
export interface ITrustedTopBrands {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  brands: Types.ObjectId[];
}

export interface IFeatureBanner {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  image: string;
  button_text: string;
  button_link: string;
}

export interface IFeatures {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  options: {
    title: string;
    description: string;
  }[];
}

export interface IStats {
  serial_no: number;
  is_hidden: boolean;
  background_image: string;
  stats: {
    count: number;
    suffix: string;
    label: string;
  }[];
}

export interface IKeyBenefits {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  options: {
    title: string;
    description: string;
    image: string;
  }[];
}
export interface IPortfolioOverview {
  serial_no: number;
  is_hidden: boolean;
  image: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
}
export interface IStartProjectCTA {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  background_image: string;
  button_text: string;
  button_link: string;
  phone_number: string;
}

export interface IBestFeatures {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  options: {
    title: string;
    description: string;
  }[];
}

export interface ITechStack {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  techs: {
    name: string;
    url: string;
  }[];
}

export interface IPricingPlan {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  plans: {
    name: string;
    original_price: string;
    save: string;
    discounted_price: string;
    description: string;
    features: string[];
  }[];
}

export interface IConversionFocusedCTA {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  background_image: string;
  button_text: string;
  button_link: string;
  phone_number: string;
}
export interface ICustomerFocusedCTA {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  key_points: string[];
  image: string;
  button_text: string;
  button_link: string;
}
export interface ISuccessFocusedCTA {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description?: string;
  key_points: string[];
  image: string;
  button_text: string;
  button_link: string;
}

export interface IIndustries {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  industries: {
    name: string;
    icon: string;
  }[];
}

export interface IWorkflow {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  steps: {
    title: string;
    description: string;
  }[];
}

export interface IFaqs {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  image: string;
  options: {
    question: string;
    answer: string;
  }[];
}

export interface IStartProjectForm {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  short_description: string;
  description: string;
  button_text: string;
  button_link: string;
}
export interface IMoreInfo {
  serial_no: number;
  is_hidden: boolean;
  title: string;
  description: string;
  content: string;
}

export interface IService {
  slug: string;
  seo_content: {
    meta_title: string;
    meta_description: string;
    canonical_url?: string;
    keywords: string;
    og_image?: string;
  };
  banner: IBanner;
  pickup_corner: IPickup_corner;
  trusted_top_brands: ITrustedTopBrands;
  feature_banner: IFeatureBanner;
  features: IFeatures;
  stats: IStats;
  key_benefits: IKeyBenefits;
  portfolio_overview: IPortfolioOverview;
  start_project_cta: IStartProjectCTA;
  best_features: IBestFeatures;
  tech_stack: ITechStack;
  pricing_plan: IPricingPlan;
  conversion_focused_cta: IConversionFocusedCTA;
  customer_focused_cta: ICustomerFocusedCTA;
  success_focused_cta: ISuccessFocusedCTA;
  industries: IIndustries;
  workflow: IWorkflow;
  more_info: IMoreInfo;
  faqs: IFaqs;
  success_meters: ISuccessMeter;
  start_project_Form: IStartProjectForm;
  status: string;
  is_deleted: boolean;
}
