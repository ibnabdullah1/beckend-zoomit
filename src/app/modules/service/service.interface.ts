export interface IBanner {
  title: string;
  sub_title: string;
  description: string;
  background_image: string;
  button_text: string;
  button_link: string;
}

export interface ITrustedTopBrands {
  title: string;
  brands: {
    name: string;
    logo: string;
  }[];
}

export interface IFeatureBanner {
  title: string;
  description: string;
  image: string;
  button_text: string;
  button_link: string;
}

export interface IFeatures {
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
  background_image: string;
  stats: {
    count: number;
    suffix: string;
    label: string;
  }[];
}

export interface IKeyBenefits {
  title: string;
  description: string;
  options: {
    title: string;
    description: string;
    image: string;
  }[];
}

export interface IStartProjectCTA {
  title: string;
  description: string;
  background_image: string;
  button_text: string;
  button_link: string;
  phone_number: string;
}

export interface IBestFeatures {
  title: string;
  description: string;
  options: {
    title: string;
    description: string;
  }[];
}

export interface ITechStack {
  title: string;
  description: string;
  techs: {
    name: string;
    url: string;
  }[];
}

export interface IPricingPlan {
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
  title: string;
  description: string;
  background_image: string;
  button_text: string;
  button_link: string;
  phone_number: string;
}

export interface IIndustries {
  title: string;
  description: string;
  industries: {
    name: string;
    icon: string;
  }[];
}

export interface IWorkflow {
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
  title: string;
  description: string;
  image: string;
  options: {
    question: string;
    answer: string;
  }[];
}

export interface IStartProjectForm {
  title: string;
  short_description: string;
  description: string;
  button_text: string;
  button_link: string;
}
export interface IMoreInfo {
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
  trusted_top_brands: ITrustedTopBrands;
  feature_banner: IFeatureBanner;
  features: IFeatures;
  stats: IStats;
  key_benefits: IKeyBenefits;
  start_project_cta: IStartProjectCTA;
  best_features: IBestFeatures;
  tech_stack: ITechStack;
  pricing_plan: IPricingPlan;
  conversion_focused_cta: IConversionFocusedCTA;
  industries: IIndustries;
  workflow: IWorkflow;
  more_info: IMoreInfo;
  faqs: IFaqs;
  start_project_Form: IStartProjectForm;
  status: string;
  is_deleted: boolean;
}
