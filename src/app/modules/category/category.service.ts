import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: ICategory) => {
  return await Category.create(payload);
};

const getAllCategories = async () => {
  return await Category.find({});
};

const updateCategoryFromDB = async (
  id: string,
  payload: Partial<ICategory>
) => {
  return await Category.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCategoryFromDB = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategoryFromDB,
  deleteCategoryFromDB,
};
