import React, {createContext, FunctionComponent, ReactChild, ReactComponentElement, ReactNode, useCallback, useContext, useState} from "react";

import {v4 as uuidV4} from "uuid";

export type ModalData = {
  children: ReactComponentElement<any, any>;
  name: string;
  id: string;
}

export type ModalProps = {
  id?: ModalData["id"]
}

export type ModalDataInput = Partial<Omit<ModalData, "name">>
export type ModalIdOrName = ModalData["id"] | ModalData["name"] | undefined

type ModalContext = {
  modalDataList: ModalData[]
  addModal: (dataInput: ModalDataInput) => void
  removeModal: (idOrName: ModalIdOrName) => void
  updateModal: (dataInput: ModalDataInput) => void
  upsertModal: (dataInput: ModalDataInput) => void
  findModalIndex: (idOrName: ModalIdOrName) => void
}

export const useModal= () => {
  return useContext(ModalContext);
};

export const ModalContext = createContext<ModalContext>({
  modalDataList: [],
  addModal: (dataInput: ModalDataInput) => {},
  removeModal: (idOrName: ModalIdOrName) => {},
  updateModal: (dataInput: ModalDataInput) => {},
  upsertModal: (dataInput: ModalDataInput) => {}, 
  findModalIndex: (idOrName: ModalIdOrName) => {},
});

export const ModalProvider: FunctionComponent = ({children}) => {
  const [modalDataList, setModalDataList] = useState<ModalData[]>([])

  const addModal = useCallback((dataInput: ModalDataInput) => {
    if (dataInput.children) {
      const newModalData:ModalData = {
        id: uuidV4(),
        ...dataInput,
        children: dataInput.children,
        name: dataInput.children.type.name || ""
      }
      setModalDataList([...modalDataList, newModalData])
    }
  },[modalDataList]);

  const removeModal = useCallback((idOrName: ModalIdOrName) => {
    const newModalDataList = [...modalDataList]
      .filter(item => item.id !== idOrName)
      .filter(item => item.name !== idOrName)
    setModalDataList(newModalDataList)
  },[modalDataList]);

  const findModalIndex = useCallback((idOrName: ModalIdOrName)=>{
    const idModalIndex = modalDataList.findIndex(item => item.id === idOrName);
    const nameModalIndex = [...modalDataList].reverse().findIndex(item => item.name === idOrName);

    return idModalIndex !== -1 ? idModalIndex : nameModalIndex !== -1 ? nameModalIndex : -1;
  },[modalDataList])

  const updateModal = useCallback((dataInput: ModalDataInput) => {
    const modalIndex = findModalIndex(dataInput.id || dataInput.children?.type.name);
    if (modalIndex === -1) return;

    const newModalDataList = [...modalDataList];
    newModalDataList[modalIndex] = {...newModalDataList[modalIndex], ...dataInput};

    setModalDataList(newModalDataList);
  },[findModalIndex, modalDataList]);

  const upsertModal = useCallback((dataInput: ModalDataInput)=>{
    const modalIndex = findModalIndex(dataInput.id || dataInput.children?.type.name);
    if (modalIndex === -1){
      addModal(dataInput)
    }
    else {
      updateModal(dataInput)
    }
  },[addModal, findModalIndex, updateModal])
  
  return (
    <ModalContext.Provider value={{
      modalDataList,
      addModal,
      removeModal,
      updateModal,
      upsertModal,
      findModalIndex,
    }}>
      {children}
    </ModalContext.Provider>
  );
};
