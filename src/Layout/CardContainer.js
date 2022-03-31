import React, { useContext,useState} from "react";
import {HeaderContext} from '../context';
import { Tabs } from "antd";
import {DollarOutlined ,EyeInvisibleOutlined ,HeartOutlined  } from "@ant-design/icons";
import Icon1 from '../assets/img/mint.svg'
import Icon2 from '../assets/img/brush.svg'
import Icon3 from '../assets/img/userIcon.svg'
import Icon4 from '../assets/img/dollar-circle.svg'
import Icon5 from '../assets/img/eye-slash.svg'
import Icon6 from '../assets/img/eye-slash.svg'

import IconWhite1 from '../assets/img/mint-white.svg'
import IconWhite2 from '../assets/img/brush_white.svg'
import IconWhite3 from '../assets/img/userIconWhite.svg'
import IconWhite4 from '../assets/img/dollar-circle-white.svg'
import IconWhite5 from '../assets/img/eye-slash-white.svg'
import IconWhite6 from '../assets/img/userIconWhite.svg'


const { TabPane } = Tabs;

const CardContainer = ({ children }) => {
  const {isDark} = useContext(HeaderContext);
  return (
    <div>
      <div className="">
        <Tabs defaultActiveKey="1" centered size="large">
          <TabPane
            tab={
              <span className={`Sp24 custom_flex_center  ${isDark&&'text-white'}`}>
            {isDark?(<img src={IconWhite1} className="mr-10"/>):(<img src={Icon1} className="mr-10"/>)}
                Minted <span className="Inter16 font-grey-light ml-5">0</span>
              </span>
            }
            key="1"
          >
            <div>{children}</div>
          </TabPane>
          <TabPane
            tab="Created"
            tab={
              <span className={`Sp24 custom_flex_center  ${isDark&&'text-white'}`}>
               {isDark?(<img src={IconWhite2} className="mr-10"/>):(<img src={Icon2} className="mr-10"/>)}
                Created  <span className="Inter16 font-grey-light ml-5">1</span>
              </span>
            }
            key="2"
          >
            <div >{children}</div>
          </TabPane>
          <TabPane
            tab="Owned"
            tab={
              <span className={`Sp24 custom_flex_center  ${isDark&&'text-white'}`}>
               {isDark?(<img src={IconWhite3} className="mr-10"/>):(<img src={Icon3} className="mr-10"/>)}
                Owned <span className="Inter16 font-grey-light ml-5">1</span>
              </span>
            }
            key="3"
          >
            <div >{children}</div>
          </TabPane>
          <TabPane
            tab="Sold"
            tab={
              <span className={`Sp24 custom_flex_center  ${isDark&&'text-white'}`}>
                {isDark?(<img src={Icon4} className="mr-10"/>):(<img src={IconWhite4} className="mr-10"/>)}
                Sold <span className="Inter16 font-grey-light ml-5">0</span>
              </span>
            }
            key="4"
          >
            <div >{children}</div>
          </TabPane>
          <TabPane
            tab="Hidden"
            tab={
              <span className={`Sp24 custom_flex_center  ${isDark&&'text-white'}`}>
                 {isDark?(<img src={IconWhite5} className="mr-10"/>):(<img src={Icon5} className="mr-10"/>)}
                Hidden <span className="Inter16 font-grey-light ml-5">0</span>
              </span>
            }
            key="5"
          >
            <div >{children}</div>
          </TabPane>
          <TabPane
            tab="Favorited"
            tab={
              <span className={`Sp24 custom_flex_center  ${isDark&&'text-white'}`}>
                <HeartOutlined  style={{marginRight:'10px'}}/>
                Favorited <span className="Inter16 font-grey-light ml-5">12</span>
              </span>
            }
            key="6"
          >
            <div>{children}</div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CardContainer;
