import React from "react"
import {AddModal} from "components/organisms/modal/AddModal"

// access 
export const modalIdList = [
  "ADD_LIBRARY_ITEM",
] as const;
export type ModalId = typeof modalIdList[number];

export const modalIdComponentMap = new Map<ModalId, React.FunctionComponent<any>>([
  ["ADD_LIBRARY_ITEM", AddModal],
]);
