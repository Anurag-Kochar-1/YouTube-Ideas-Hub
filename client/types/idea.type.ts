export type Idea = {
  id: string;
  title: string;
  description: string | null;
  createdById: string;
  createdAt: string;
  status: string;
  suggestedFor: {
    channelName: string;
    channelId: string;
    channelLogo: string;
    statistics: { subscriberCount: string };
  }[] | [];
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
};

export type FetchIdeasDataMeta = {
  totalPages: number;
  currentPage: number;
  limit: number;
};
