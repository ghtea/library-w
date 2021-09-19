import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {Flex} from "components/atoms"
import { ModalId } from "./maps";

export type ModalContext = {
  openModalList: [ModalId, React.FunctionComponent<any>][];
  openModal: (modalId: ModalId, component: React.FunctionComponent<T>, props: T) => void;
  //toggleModal: (modalId: string, shouldOpen?: boolean) => void
};

const initialModalContext: ModalContext = {
  openModalList: [],
  openModal: (modalId: ModalId, component: React.FunctionComponent<any>) => {},
  // toggleModal: (modalId: string, shouldOpen?: boolean) => {}
};

export const ModalContext = createContext<ModalContext>(initialModalContext);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider: FunctionComponent = (props) => {
  const [openModalList, setOpenModalList] = useState<[ModalId, React.FunctionComponent<any>][]>([])

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

  const openModal = useCallback((modalId: ModalId, component: React.FunctionComponent<any>)=>{

  },[])


  const value = useMemo(()=>{
    return ({
      openModalList,
      openModal
    })
  },[openModalList])
  
  return (
    <ModalContext.Provider value={value}>
      {props.children}
      <Flex>
        
      {openModalList.map(([modalId, modalComponent])=>{
        return (
        <Flex>
          <modalComponent></modalComponent>
        </Flex>
      )
      })}
      </Flex>
    </ModalContext.Provider>
  );
};
