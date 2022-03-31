import { useState, useContext, useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";
import SortButton from "../Components/SortButton";
import DropdownButton from "../Components/DropdownButton";
import dollar from "../assets/img/dollars.svg";
import { Layout } from "antd";
import allIcon from "../assets/img/all.svg";
import DetailCard from "../Components/DetailCard";
import filterIcon from "../assets/img/filter.svg";
import "../assets/styles/category_list.scss";
import { HeaderContext } from "../context";
import axios from "axios";
import http from "../http";

const sortNames = ["Category", "Collections", "Price range"];

const CategoryContainer = () => {
  const [openName, setOpenName] = useState([false, false]);
  const [openSort, setOpenSort] = useState({ name: null, id: null });
  const [cardList, setCardList] = useState();
  const {
    isDark,
    priceSortIndex,
    sortIndex,
    setSortIndex,
    setPriceSortIndex,
    setSearchByPrice,
    searchByCollection,
    searchKey,
    setSearchByCollection,
    searchByPrice,
    fromPrice,
    toPrice,
    categoryKey,
    setLoading,
    setGetItemType
  } = useContext(HeaderContext);
  const [sortKind, setSortKind] = useState([
    {
      name: "All items",
      data: [
        { name: "All", status: true },
        { name: "3D Models", status: false },
        { name: "Pictures", status: false },
        { name: "Music", status: false },
        { name: "Photographies", status: false },
        { name: "Videos", status: false },
      ],
    },
    {
      name: "Sort by",
      data: [
        { name: "Recently added", status: true },
        { name: "Price: Low to High", status: false },
        { name: "Price: High to Low", status: false },
      ],
    },
  ]);

  useEffect(() => {
    console.log('this is useEffect functions');
    setLoading(true)
    axios
      .get(http + "api/article/list")
      .then((res) => {
        console.log('res', res)
        setCardList(res.data);
        setLoading(false)
      })
      .catch((err) => {
      });
      setSortIndex(0);
      setPriceSortIndex(0);
      setGetItemType(0);

  }, []);

  useEffect(() => {
    console.log('this is searchByCollection functions');
    if (searchByCollection) {
      axios
        .get(http + "api/article/search/" + searchKey)
        .then((res) => {
          setCardList(res.data);
        })
        .catch((err) => {
        });
      setSearchByCollection(false);
    } else return;
  }, [searchByCollection]);

  useEffect(() => {
    console.log('this is searchByPrice functions');
    if (searchByPrice) {
      let data = {};
      data.fromPrice = parseFloat(fromPrice);
      data.toPrice = parseFloat(toPrice);

      axios
        .post(http + "api/article/filter/byPrice", data)
        .then((res) => {
          setCardList(res.data);
        })
        .catch((err) => {
        });

      setSearchByPrice(false);
    } else return;
  }, [searchByPrice]);

  useEffect(() => {
    console.log('this is searchByPrice priceSortIndex');
    axios
      .get(http + "api/article/sort/" + priceSortIndex)
      .then((res) => {
        setCardList(res.data);
      })
      .catch((err) => {
      });
  }, [priceSortIndex]);

  useEffect(() => {
    console.log('this is searchByPrice sortIndex');
    axios
      .get(http + "api/article/sortby/" + sortIndex)
      .then((res) => {
        setCardList(res.data);
      })
      .catch((err) => {
      });
  }, [sortIndex]);

  useEffect(() => {
    if (categoryKey != undefined) {
      axios
        .get(http + "api/article/sort/category/" + categoryKey)
        .then((res) => {
          setCardList(res.data);
        })
        .catch((err) => {
        });
    }
  }, [categoryKey]);

  const changeSortContent = (label, id) => {
    if( label == "Sort by"){
      setPriceSortIndex(id) ;
      // setSortIndex(0)
    }
    else {
      setSortIndex(id);
      setPriceSortIndex(0);
    }

    var original = sortKind.map((item, index) => {
      if (item.name === label) {
        const array = item.data.map((ele, num) => {
          num === id ? (ele.status = true) : (ele.status = false);
          return ele;
        });
        return { name: label, data: array };
      } else {
        return item;
      }
    });
    setSortKind(original);
    setOpenName("");
  };

  const handleOpen = (name, id) => {
    setOpenName("");
    if (openSort.name != name) {
      return setOpenSort({ name, id });
    }
    setOpenSort({ name: null, id: null });
  };

  const handleClose = (state) => {
    setOpenSort({ name: null, id: null });
  };

  const handleSortButton = (label) => {
    setOpenName(label);
    setOpenSort({ name: null, id: null });
  };
  const handleTotalClose = (e) => {
    if (openSort.name) setOpenSort({});
    if (openName) setOpenName("");
  };

  const handleOpenButtonDiv = (e) => {
    e.stopPropagation();
  };

  return (
    <Layout className={` ${isDark ? "back-dark" : "bg-white"}`}>
      <div onClick={handleTotalClose}>
        <div
          className=" w-100 d-flex flex-row justify-content-between cateogy-container"
          style={{ marginTop: "100px" }}
        >
          <div
            className="d-flex flex-row sort-button-container"
            style={{ marginLeft: "-10px" }}
          >
            {sortNames.map((item, index) => {
              return index != 2 ? (
                <div key={index} onClick={handleOpenButtonDiv}>
                  <SortButton
                    label={item}
                    openSort={openSort}
                    close={handleClose}
                    handleButtonClick={() => handleOpen(item, index)}
                  >
                    <BarsOutlined />
                  </SortButton>
                </div>
              ) : (
                <div key={index} onClick={handleOpenButtonDiv}>
                  <SortButton
                    label={item}
                    openSort={openSort}
                    close={handleClose}
                    handleButtonClick={() => handleOpen(item, index)}
                  >
                    <img src={dollar} />
                  </SortButton>
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-row sort-btn-area">
            {sortKind.map((item, index) => {
              return index == 0 ? (
                <div key={index}>
                  <DropdownButton
                    label={item.name}
                    data={item.data}
                    isClick={openName == item.name ? true : false}
                    setSortContent={changeSortContent}
                    handleSortButton={handleSortButton}
                  >
                    <img src={allIcon} />
                  </DropdownButton>
                </div>
              ) : (
                <div key={index}>
                  <DropdownButton
                    label={item.name}
                    data={item.data}
                    isClick={openName == item.name ? true : false}
                    setSortContent={changeSortContent}
                    handleSortButton={handleSortButton}
                  >
                    <img src={filterIcon} />
                  </DropdownButton>
                </div>
              );
            })}
          </div>
        </div>
        <div className="list-content row">
          {cardList && cardList.map(card => {
              return (
           
                  <DetailCard
                    name={card.name}
                    price={card.price}
                    collection={card.collectionType}
                    url={card.img}
                    id={card._id}
                    favourite={card.favourite}
                    views ={card.views}
                    key={card._id}
                  />
      
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryContainer;
