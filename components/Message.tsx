import Iframe from 'react-iframe';
import Lightbox from 'react-image-lightbox';
import React, { useEffect, useState, useMemo, FC } from 'react';
import { Button, Alert, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Base64, getCookie, isNullOrEmpty } from '../Utils'
import { IMessage_FROM_Server } from '../Interfaces';
interface IMessage{
    message: IMessage_FROM_Server;
    myNameRef: React.MutableRefObject<string>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;

}
export const Message: FC<IMessage> = (props) => {

    const [lightBoxState, setLightBoxState] = useState({ photoIndex: 0, isOpen: false });
 
    const fromwhoDecode = useMemo(() => Base64.decode(props.message.fromwho), [])
    const usernameDecode = useMemo(() => Base64.decode(props.message.fromwho), [])
    const isLocal: boolean = useMemo(() => props.message.fromwho === props.myNameRef.current, [])

     

    const incomingAudio = useMemo(() => b64toBlob(props.message.audio), []);

    function b64toBlob(dataURI: string) {
        try {
            var byteString = atob(dataURI.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return URL.createObjectURL(new Blob([ab], { type: 'audio/x-mpeg-3' }));
        }
        catch {
            return null;
        }

    }

 

      function onSelectHandler(e: React.SyntheticEvent<HTMLElement, Event>, value: string) {
          props.setActiveTab(value);
      }
    function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) {
       
    }


    return (
      
            <div className="messagechat">
                <div className={isLocal ? "userchat-right" : "userchat-left" } >
                    {/* {props.fromwho === props.myName&& (
                       
                        <Button variant="info"  className="message-name-button-right"> {props.usersSex[props.cookie] != undefined && <img src={props.usersSex[props.cookie] == "w" ? "./Sex-Female.png" : "./Sex-Male.png"} style={{ height: '20px', width: '20px' }} />}     {cookieDecode} </Button>
                    )} */}
                        
                            <Button variant="info" className="message-name-button-left" onClick={(e) => onClickHandler(e, fromwhoDecode)}>     { isLocal ? props.message.fromwho: props.message.forwho } </Button>
                            <DropdownButton as={ButtonGroup} title=" " id="bg-vertical-dropdown-1">
                                <Dropdown.Item eventKey="1" onSelect={(e) => onSelectHandler(e, props.message.fromwho)} >Написать в приват</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Заблокировать</Dropdown.Item>
                            </DropdownButton>
                </div>

            
                <>
                        {!props.message.imageastext && !props.message.youtubeastext && (props.message.textmessage)}
                        {props.message.imageastext && true && (
                            <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                        <img src={'./uploadImages/' + props.message.imageastext} style={{ height: 'auto', width: '200px', borderRadius: '1rem' }} />
                            </a>
                        )}
                        {props.message.imageastext &&false && (
                        <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                        <img src={props.message.textmessage} style={{ height: 'auto', width: '200px', borderRadius:'1rem' }} />
                            </a>
                        )}




                        {props.message.imageurl && true && (
                            <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                                <img src={'./hidescreener.png'} style={{ height: '30px' }} />
                            </a>
                        )}

                        {props.message.imageastext && true && (
                            <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                                <img src={'./hidescreener.png'} style={{ height: '30px' }} />
                            </a>
                        )}

                        {props.message.imageastext && lightBoxState.isOpen && (
                            <Lightbox
                                mainSrc={props.message.textmessage}
                                onCloseRequest={() => setLightBoxState({ photoIndex: 0, isOpen: false })}
                            />
                        )}
                       


                        {!props.message.imageastext && lightBoxState.isOpen && (
                            <Lightbox
                                mainSrc={'./uploadImages/' + props.message.imageastext}
                                onCloseRequest={() => setLightBoxState({ photoIndex: 0, isOpen: false })}
                            />
                        )
                        }



                        {props.message.youtubeastext && (
                        <iframe className="youtube" frameBorder={0} allowFullScreen={true} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  src={props.message.youtubeastext} />
                        )}
                        { /*
                         
                             {props.videoastext && (
                            <video src={props.videoastext} autoplay muted playsinline preload="metadata" controls="controls" loop style={{ height: "auto", width: "300px" }}  >  </video>
                        )}
                         */}
                     

                        {
                           !isNullOrEmpty(props.message.audio) && (
                                <audio controls src={props.message.audio} />
                            )
                        }
                </>
            </div>
    );


}
 