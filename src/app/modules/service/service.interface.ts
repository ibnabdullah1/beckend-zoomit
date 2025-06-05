// Step 1: interface (src/modules/service/service.interface.ts)

export interface IButton {
  text: string;
  link: string;
}

export interface IOption {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface IFaqOption {
  question: string;
  answer: string;
}

export interface IPriceOption {
  title: string;
  original_price: string;
  discounted_price: string;
  description: string;
  features: string[];
}

export interface IServiceContent {
  banner: {
    title: string;
    description: string;
    image: string;
    button: IButton;
  };
  featureBanner: {
    title: string;
    description: string;
    image: string;
    button: IButton;
  };
  features: {
    title: string;
    description: string;
    options: IOption[];
  };
  faqs: {
    title: string;
    description: string;
    image: string;
    button: IButton;
    options: IFaqOption[];
  };
  benefits: {
    title: string;
    description: string;
    options: IOption[];
  };
  price: {
    title: string;
    description: string;
    options: IPriceOption[];
  };
  more_info?: {
    content: string;
  };
}

export interface IService {
  theme_id: number;
  content: IServiceContent;
  seo_content: {
    seo_title: string;
    meta_description: string;
    canonical_url?: string;
    service_slug: string;
    keywords: string;
    og_image?: string;
  };
  is_published: boolean;
  is_drafted: boolean;
  is_deleted: boolean;
  createdBy?: string;
}
