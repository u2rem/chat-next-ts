import React, { useEffect, useState, useMemo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import{ IsUrlAndImage, IsUrlAndMP4,IsUrlAndYoutube, getCookie, Base64, checkIsRoom} from '../Utils' ;
import 'react-image-lightbox/style.css';
 
import { NotifyBadge } from '../components/NotifyBadge';
 
 
import {AlertDismissibleExample} from './AlertDismissibleExample';
import { Sidebar } from './Sidebar';
 
 
import {IMessage_FROM_Server} from '../Interfaces';
export const MessagesField = (props) => {
 
    const [columnMessagessCSS, setColMessagessCSS] = useState({});
    const [isOnImage, setIsOnImage] = useState("");
    const [isOnScroll, setIsOnScroll] = useState("");
   
    const [prevTab, setPrevTab] = useState(null);
    const [modalMessage, setModalMessage] = useState("Введите пароль");
    const [nameClickText, setNameClickText] = useState("");
    const [columnUsersCSS, setColumnUsersCSS] = useState({});
    const [startTouch, setStartTouch] = useState(0);
   

    const SendRequest = (gifUrl) => {
        var cookie = getCookie("Session");
        let recipient = props.activeTab;
        let isRoom = checkIsRoom(props.roomsDic, recipient);
        var text = (document.getElementById("textfield") as HTMLFormElement).value;
        if (gifUrl != null) {
            text = gifUrl;
        }
        var _imageastext = IsUrlAndImage(text);
        var _youtubeastext = IsUrlAndYoutube(text);
        var _videoastext = IsUrlAndMP4(text);   

     

        fetch('/ChatPage/Send',
            {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    recipient: recipient,
                    sender: cookie,
                    message: text,
                    isThisRoom: isRoom
                })
            });


            ( document.getElementById("textfield") as HTMLFormElement).value = "";
            ( document.getElementById("textfield") as HTMLFormElement).focus();
            ( document.getElementById("textfield") as HTMLFormElement).select();
    }
  
    
    function oncheckedHandler(e, tab) {
        // setPrevTab(props.activeTab);
        // if ((tab in props.roomsDic) && (props.roomsDic[tab].isPassword)) {
        //     if (tab in props.secretRoomUsers) {
        //         if (!props.secretRoomUsers[tab].includes(props.cookie)) {
                   
        //             setModalMessage("Введите пароль от секретной комнаты");
        //         }
        //     }
        // }
      
        props.setActiveTab(tab);

      //  var barge = props.usersBadge;
     //  barge[tab] = null;
     //   props.setUserBadge(barge); 
        
   }

    useEffect(() => {
       
        if (isOnScroll) {
            var cleft = document.getElementById("cright");
            cleft.scrollTop = cleft.scrollHeight;
        }
    }, []);
    useEffect(() => {
       
        if (isOnScroll) {
            var cleft = document.getElementById("cright");
            cleft.scrollTop = cleft.scrollHeight;
        }
    }, [isOnScroll, props.activeTab]);
    const changeSizeLeftMenu = () => {
        setColMessagessCSS(onRightCSS); 
        setColumnUsersCSS(onLeftCSS);
         
    }
    const changeSizeRightMenu = () => {
        setColMessagessCSS(offRightCSS); 
        setColumnUsersCSS(offLeftCSS);
        
    }
    const onLeftCSS = {
        width: "45%",
        position: "fixed",
        overflow: "auto"  
    }
    const onRightCSS = {
        width: "55%",
        position: "fixed",
        overflow: "auto" 
      
    }
    const offLeftCSS = {
        width: "85px",
        position: "fixed",
        overflow: "auto" 
    }
    const offRightCSS = {
        width: "calc(100% - 85px)",
        position: "fixed",
        overflow: "auto" 
        
    }

 
    function onTap(event) {
        setStartTouch ( event.touches[0].clientX);
    }

    function moveTouch(event) {
        var x = event.changedTouches[0].clientX;

        var move = startTouch - x;
        if (move < -100) {
            console.log("open");
            changeSizeLeftMenu();
             
        }
        if (move > 100) {
            console.log("close");
            changeSizeRightMenu();
        }
        console.log(move)
    }
    const womanCSS = {
        backgroundColor: "rgb(255, 182, 193)"
    }
    const manCSS = {
        backgroundColor: "rgb(172, 194, 188)"
    }
    return (
        <div className="columntext" id="cright">
        <NotifyBadge {...props}/> {/*Ghost user entered notif*/}
        <ul id="messages">
            <Tabs defaultActiveKey="Home" unmountOnExit={false} activeKey={props.activeTab} transition={false} id="noanim-tab-example" className="chatTabs"  >
                {
                     Object.keys(props.publicMessages).map(function (name, i) {
                         return (
                             <Tab eventKey={name} title={name} key={i} className="message-field" disabled>
                                 {
                                     props.publicMessages[name].map((message: IMessage_FROM_Server, message_key) => {
                                         return (
                                             <AlertDismissibleExample key={message_key} message={message}  setNameClickText={setNameClickText} nameClickText={nameClickText} isOnImage={isOnImage} isOnScroll={isOnScroll} setIsOnImage={setIsOnImage} setIsOnScroll={setIsOnScroll} {...props} />
                                         );
                                     })
                                 }
                             </Tab>
                         );
                     })
                }

                {
                     Object.keys(props.privateMessages).map(function (name, i) {
                         return (
                             <Tab eventKey={name} title={name} key={i} className="message-field" disabled>
                                 {
                                     props.privateMessages[name].map((message: IMessage_FROM_Server, message_key) => {
                                         return (
                                             <AlertDismissibleExample key={message_key} message={message}  setNameClickText={setNameClickText} nameClickText={nameClickText} isOnImage={isOnImage} isOnScroll={isOnScroll} setIsOnImage={setIsOnImage} setIsOnScroll={setIsOnScroll} {...props} />
                                         );
                                     })
                                 }
                             </Tab>
                         );
                     })
                }
            </Tabs>
        </ul>
         <Sidebar sendRequest={SendRequest } setIsOnImage={setIsOnImage} setIsOnScroll={setIsOnScroll} isOnImage={isOnImage} isOnScroll={isOnScroll} {...props} />
    </div>
       );
}