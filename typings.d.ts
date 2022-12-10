export interface categoryName {
  strCategory: string;
}

export interface categoryList {
  meals: categoryName[];
}

export interface areaName {
  strArea: string;
}

export interface areaList {
  meals: areaName[];
}

export interface categoryDetails {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface allCategories {
  categories: categoryDetails[];
}
