type FormContents = {
  image?: File;
  title: string;
  genre: BookGenre;
  author: string;
  page: number;
  status: '読了' | '読中' | '未読';
};

type BookGenre = 'マンガ' | '雑誌' | 'ビジネス' | '文学' | 'IT' | '趣味';

type Content = {
  id?: string;
  created_by?: string;
  image?: string;
  title: string;
  genre: BookGenre;
  author: string;
  page: number;
  status: '読了' | '読中' | '未読';
  summary?: string[];
};

type ValueOf<T> = T[keyof T];

type ContentSummary = ValueOf<Required<Pick<Content, 'summary'>>>;
