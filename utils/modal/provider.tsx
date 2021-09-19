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

export type ModalContext = {
  openModalList: string[]
  toggleModal: (modalId: string, shouldOpen?: boolean) => void
};

const initialModalContext: ModalContext = {
  openModalList: [],
  toggleModal: (modalId: string, shouldOpen?: boolean) => {}
};

export const ModalContext = createContext<ModalContext>(initialModalContext);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider: FunctionComponent = (props) => {
  const [openModalList, setOpenModalList] = useState<string[]>([])

  const toggleModal = useCallback((modalId: string, shouldOpen?: boolean)=>{
    const isOpenModal = openModalList.includes(modalId);

    const newShouldOpen = shouldOpen ? shouldOpen : !isOpenModal;
    if (newShouldOpen){
      const newOpenModalList = [modalId, ...openModalList];
      setOpenModalList(newOpenModalList)
    }else {
      const newOpenModalList = openModalList.filter(item => item !== modalId)
      setOpenModalList(newOpenModalList)
    }
  },[])

  const value = useMemo(()=>{
    return ({
      openModalList,
      toggleModal
    })
  },[openModalList])
  
  return (
    <ModalContext.Provider value={value}>
      {props.children}
      <Flex>
        
      {openModalList.map(item=>(
        <Flex>
          
        </Flex>
      ))}
      </Flex>
    </ModalContext.Provider>
  );
};
