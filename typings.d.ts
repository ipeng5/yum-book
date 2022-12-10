export interface AategoryName {
  strCategory: string;
}

export interface AreaName {
  strArea: string;
}

export interface AreaList {
  meals: AreaName[];
}

export interface CategoryDetails {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface AllCategories {
  categories: CategoryDetails[];
}

export interface CategoryLists {
  meals: Meal[];
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
