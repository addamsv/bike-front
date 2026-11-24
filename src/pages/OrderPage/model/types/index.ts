import { EntityState } from "@reduxjs/toolkit";
import { EBookListView, IBook, EBookListSortField, EBookOfHashTagType } from "entities/Book";
import { TypeSortOrder } from "resources/types";

// silence is golden
export interface IOrderPageStateSchema {
  isLoading?: boolean;
  error?: string;

  // pagination
  // page: number;
  // limit: number;
  // hasMore: boolean;

  // listView: EBookListView;

  // order: TypeSortOrder;
  // sort: EBookListSortField;
  // search: string;
  // hashTag: EBookOfHashTagType

  // _isStateInit: boolean;

  data?: IBook;
}
