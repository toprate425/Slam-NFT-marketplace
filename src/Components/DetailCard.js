import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState, useContext, useEffect } from "react";
import { HeaderContext } from "../context";
import Button from "./Button";
import SmallButton from "./SmallButton";
import eye from "../assets/img/eye.svg";
import { useHistory } from "react-router-dom";
import auth from "../auth/auth-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import http from "../http";
import "../assets/styles/card.scss";
const token = auth.isAuthenticated();

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const DetailCard = ({ url, name, price, collection, id, favourite, views }) => {
  const [windowSize, setWindowSize] = useState();
  const [hasPermission, setHasPermission] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(favourite);
  const history = useHistory();

  const size = useWindowSize();

  const { theme, setTheme, isDark } = useContext(HeaderContext);
  const ShowInfo = (id) => {
    history.push("/buy/" + id);
  };

  useEffect(() => {
    var size = window.innerWidth;
    setWindowSize(size);
  }, []);

  useEffect(() => {
    if (
      auth.isAuthenticated() &&
      currentLikes.includes(sessionStorage.getItem("id"))
    ) {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }, [currentLikes]);

  useEffect(() => {
    let len = document.getElementsByClassName("card").length;
    for (let i = 0; i < len; i++) {
      isDark
        ? (document.getElementsByClassName("card")[i].style.background =
            "#1D2333")
        : (document.getElementsByClassName("card")[i].style.background =
            "#fafafa");
    }
  }, [isDark]);

  useEffect(() => {
    if (size.width >= 768) {
      setTheme(1);
    }
  }, [size]);

  const handleAddFavorite = (id) => {
    console.log("handleAddFavorite");
    if (!auth.isAuthenticated()) {
      toast.error("You have to  login", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } else {
      axios
        .get(http + "api/article/addFavouriteArt/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCurrentLikes(res.data.favourite);
        })
        .catch((err) => {});
    }
  };

  const handleDeleteFavorite = () => {
    if (!auth.isAuthenticated()) {
      toast.error("You have to  login", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } else {
      axios
        .get(http + "api/article/removeFavourite/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setCurrentLikes(res.data.favourite);
        })
        .catch((err) => {});
    }
  };

  const showMessage = () => {
    toast.error("You have to  login", {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

  return (
    <>
      {theme == 1 ? (
        <div className={`col-12 col-sm-6 col-lg-4 col-xl-3 item  bg-card`}>
          <div className={`card ${isDark ? "card-sec-bg" : "card-pre-bg"}`}>
            <div className="image-over">
              <div className="art-img">
                <img className="card-img-top" src={url} alt="" />
              </div>
            </div>

            <div className="card-caption col-12 p-0">
              <div className="card-body">
                <div>
                  <h5
                    className={`Sp24 mb-0 font-dark  ${isDark && "text-white"}`}
                  >
                    {name}
                  </h5>
                </div>
                <div className="d-flex align-items-center">
                  {collection == "Untitled Collection #174941512" ? (
                    <div className="Inter18 font-grey-light mt-15">
                      Unnamed Collection
                    </div>
                  ) : (
                    <div
                      className="Inter18 font-grey-light mt-15"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Collection &nbsp;"{collection}"
                    </div>
                  )}
                </div>
                <div className="card-bottom d-flex justify-content-between mt-15">
                  <div className={`Inter18  ${isDark && "text-white"}`}>
                    Price:
                  </div>
                  <div className="Inter18 font-blue InterB">
                    {price} {"ETH"}
                  </div>
                </div>
                <hr
                  className={`${isDark ? "line-dark" : "font-light"} mt-20`}
                  style={{ margin: "0px 0px 20px 0px" }}
                />
                <div className="card-bottom d-flex justify-content-between mt-15">
                  <div onClick={() => ShowInfo(id)}>
                    <Button
                      label="Buy Now"
                      textColor="white"
                      bg="primary"
                      borderColor="primary"
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center font-grey-light Inter18">
                    <img src={eye} />
                    <div className="mx-1 Inter18 font-grey-light">{views}</div>

                    {!auth.isAuthenticated() ? (
                      <span
                        className="d-flex flex-row align-items-center"
                        style={{ marginLeft: "2%", cursor: "pointer" }}
                        onClick={showMessage}
                      >
                        <HeartFilled className="font-grey-light" />
                        <span className="font-grey-light mx-1">
                          {currentLikes.length}
                        </span>
                      </span>
                    ) : hasPermission ? (
                      <span
                        className="d-flex flex-row align-items-center"
                        style={{ marginLeft: "2%", cursor: "pointer" }}
                        onClick={() => handleDeleteFavorite(id)}
                      >
                        <HeartFilled className="font-red" />
                        <span className="font-red mx-1">
                          {currentLikes.length}
                        </span>
                      </span>
                    ) : (
                      <span
                        className="d-flex flex-row align-items-center"
                        style={{ marginLeft: "2%", cursor: "pointer" }}
                        onClick={() => handleAddFavorite(id)}
                      >
                        <HeartOutlined className="font-grey-light" />
                        <span className="font-grey-light mx-1">
                          {currentLikes.length}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className={`col-6 col-sm-3 col-lg-2 item  sm-card `}>
          <div
            className={`card ${isDark ? "card-sec-bg" : "card-pre-bg"} bg-red`}
          >
            <div className="image-over">
              <div className="art-img">
                <img className="card-img-top" src={url} alt="" />
              </div>
            </div>

            <div className="card-caption col-12 p-0">
              <div className="card-body">
                <div>
                  <h5
                    className={`Sp12 mb-0 font-dark  ${isDark && "text-white"}`}
                  >
                    {name}
                  </h5>
                </div>
                <div className="d-flex align-items-center">
                  {collection == "Untitled Collection #174941512" ? (
                    <div className="Inter9 font-grey-light mt-15">
                      Unnamed Collection
                    </div>
                  ) : (
                    <div
                      className="Inter9 font-grey-light mt-15"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Collection &nbsp;"{collection}"
                    </div>
                  )}
                </div>
                <div className="card-bottom d-flex justify-content-between mt-15">
                  <div className={`Inter9  ${isDark && "text-white"}`}>
                    Price:
                  </div>
                  <div className="Inter9 font-blue InterB">
                    {price} {"ETH"}
                  </div>
                </div>
                <hr className={`${isDark ? "line-dark" : "font-light"}`} />
                <div className="card-bottom d-flex justify-content-between">
                  <div onClick={() => ShowInfo(id)}>
                    <SmallButton
                      label="Buy Now"
                      textColor="white"
                      bg="primary"
                      borderColor="primary"
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center font-grey-light Inter9">
                    <img src={eye} style={{ width: 11, height: 7 }} />
                    <div className="mx-1 Inter9 font-grey-light">{views}</div>

                    {!auth.isAuthenticated() ? (
                      <span
                        className="d-flex flex-row align-items-center"
                        style={{ marginLeft: "2%", cursor: "pointer" }}
                        onClick={showMessage}
                      >
                        <HeartFilled
                          className="font-grey-light"
                          style={{ width: 9 }}
                        />
                        <span className="font-grey-light mx-1">
                          {currentLikes.length}
                        </span>
                      </span>
                    ) : hasPermission ? (
                      <span
                        className="d-flex flex-row align-items-center"
                        style={{ marginLeft: "2%", cursor: "pointer" }}
                        onClick={() => handleDeleteFavorite(id)}
                      >
                        <HeartFilled
                          className="font-red"
                          style={{ width: 9 }}
                        />
                        <span className="font-red mx-1">
                          {currentLikes.length}
                        </span>
                      </span>
                    ) : (
                      <span
                        className="d-flex flex-row align-items-center"
                        style={{ marginLeft: "2%", cursor: "pointer" }}
                        onClick={() => handleAddFavorite(id)}
                      >
                        <HeartOutlined
                          className="font-grey-light"
                          style={{ width: 9 }}
                        />
                        <span className="font-grey-light mx-1">
                          {currentLikes.length}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default DetailCard;
