import { ParsedUrlQuery } from 'querystring';

export const genre = ['マンガ', '雑誌', 'ビジネス', '文学', 'IT', '趣味'];
export const status = ['未読', '読中', '読了'];

export const testContent: ContentSummary = [
  {
    id: 'E3NTpNU4F6eQxIPk8NFm',
    title: 'test',
    item: [
      {
        itemId: '0',
        itemData: 'initialItemData',
      },
    ],
  },
];

interface Params extends ParsedUrlQuery {
  uid: string;
  contentId: string;
}

export const testParam: Params = {
  uid: 'Z5cf4rg2SPRrDobyqvSKCo5fPhf2',
  contentId: 'E3NTpNU4F6eQxIPk8NFm',
};
