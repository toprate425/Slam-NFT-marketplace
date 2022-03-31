import  { createContext, useState } from "react";

export const HeaderContext = createContext({});

export const HeaderContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [theme, setTheme] = useState(1);
  const [isConnectWallet, setIsConnectWallet] = useState(false);
  const [isDark,setIsDark] = useState(true)
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [priceSortIndex,setPriceSortIndex] = useState(0);
  const [sortIndex,setSortIndex] = useState(0);
  const [getItemType,setGetItemType] = useState(0);
  const [searchKey,setSearchKey] = useState();
  const [fromPrice,setFromPrice] =useState(0);
  const [toPrice,setToPrice] = useState(0);
  const [searchByCollection,setSearchByCollection] = useState(false);
  const [searchByPrice,setSearchByPrice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryKey,setCategoryKey] =  useState();
  const [tabId,setTabId] =  useState('Minted');

  return (
    <HeaderContext.Provider
      value={{
        open,
        setOpen,
        isCreate,
        setIsCreate,
        theme,
        setTheme,
        isConnectWallet,
        setIsConnectWallet,
        connectedWallet, 
        setConnectedWallet,
        isDark,
        setIsDark,
        priceSortIndex,setPriceSortIndex,
        sortIndex,setSortIndex,
        getItemType,setGetItemType,
        searchKey,setSearchKey,
        fromPrice,setFromPrice,
        toPrice,setToPrice,
        searchByCollection,
        setSearchByCollection,
        searchByPrice,
        setSearchByPrice,
        loading, setLoading,
        categoryKey,setCategoryKey,
        tabId,setTabId,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
