import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {Flex} from "components/atoms"
import { ModalId } from "./maps";

export type ModalContext = {
  openedModalList: ReactNode[];
  openModal: (content: ReactNode) => void;
  closeModal: (component: FunctionComponent) => void;
  //toggleModal: (modalId: string, shouldOpen?: boolean) => void
};

const initialModalContext: ModalContext = {
  openedModalList: [],
  openModal: (content: ReactNode) => {},
  closeModal: (component: FunctionComponent) => {},
  // toggleModal: (modalId: string, shouldOpen?: boolean) => {}
};

export const ModalContext = createContext<ModalContext>(initialModalContext);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider: FunctionComponent = (props) => {
  const [openedModalList, setOpenedModalList] = useState<ReactNode[]>([])

  // const toggleModal = useCallback((modalId: string, shouldOpen?: boolean)=>{
  //   const isOpenModal = openModalList.includes(modalId);

  //   const newShouldOpen = shouldOpen ? shouldOpen : !isOpenModal;
  //   if (newShouldOpen){
  //     const newOpenModalList = [modalId, ...openModalList];
  //     setOpenModalList(newOpenModalList)
  //   }else {
  //     const newOpenModalList = openModalList.filter(item => item !== modalId)
  //     setOpenModalList(newOpenModalList)
  //   }
  // },[])

  const openModal = useCallback((content: ReactNode)=>{
    setOpenedModalList([content, ...openedModalList])
  },[])

  const closeModal = useCallback((component: FunctionComponent)=>{
    if (!component){
      setOpenedModalList(openedModalList.slice(0))
    }else {
      const newOpenedModalList = [...openedModalList.filter(item => !(item instanceof component))]
      setOpenedModalList(newOpenedModalList)
    }
  },[])

  const value = useMemo(()=>{
    return ({
      openedModalList,
      openModal,
      closeModal,
    })
  },[])
  
  return (
    <ModalContext.Provider value={value}>
      {props.children}
      <Flex>
        
      {openedModalList.map((content)=>{
        return (
        <Flex>
          {content}
        </Flex>
      )
      })}
      </Flex>
    </ModalContext.Provider>
  );
};
