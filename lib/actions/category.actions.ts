"use server"

import Category from "../database/models/category.model"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { CreateCategoryParams } from "@/types"

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase()

    const newCategory = await Category.create({ name: categoryName })
    return JSON.parse(JSON.stringify(newCategory))
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async () => {
  try {
    await connectToDatabase()

    const categories = await Category.find()
    if (categories.length === 0) {
      return []
    }
    
    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    handleError(error)
  }
}
