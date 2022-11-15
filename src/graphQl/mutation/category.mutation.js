import { gql } from "@apollo/client";

export const ADD_NEW_CATEGORY = gql`
mutation AddNewCategory($name: String!, $image: String!) {
  addNewCategory(name: $name, image: $image) {
    message
    error
    status
  }
}
`
export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($updateCategoryId: Int!, $name: String) {
  updateCategory(id: $updateCategoryId, name: $name) {
    status
    message
    error
  }
}
`
export const DELETE_CATEGORY = gql`
mutation DeleteCategory($deleteCategoryId: Int!) {
  deleteCategory(id: $deleteCategoryId) {
    status
    message
    error
  }
}
`