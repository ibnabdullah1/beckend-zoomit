// Step 1: interface (src/modules/service/service.interface.ts)

export interface IImageButton {
  text: string;
  link: string;
}

export interface IImageOption {
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
  originalPrice: string;
  discountedPrice: string;
  description: string;
  features: string[];
}

export interface IServiceContent {
  banner: {
    title: string;
    description: string;
    image: string;
    button: IImageButton;
  };
  featureBanner: {
    title: string;
    description: string;
    image: string;
    button: IImageButton;
  };
  features: {
    title: string;
    description: string;
    options: IImageOption[];
  };
  faqs: {
    title: string;
    description: string;
    image: string;
    button: IImageButton;
    options: IFaqOption[];
  };
  benefits: {
    title: string;
    description: string;
    options: IImageOption[];
  };
  price: {
    title: string;
    description: string;
    options: IPriceOption[];
  };
}

export interface IService {
  theme_id: number;
  content: IServiceContent;
  seo_content: {
    seo_title: string;
    meta_description: string;
    url_slug: string;
    keywords: string;
  };
  createdBy?: string;
}
