import Iframe from 'react-iframe';
import Lightbox from 'react-image-lightbox';
import React, { useEffect, useState, useMemo, FC } from 'react';
import { Button, Alert, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Base64, getCookie, isNullOrEmpty } from '../Utils'
import { IMessage_FROM_Server } from '../Interfaces';

import Image from 'next/image';
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
      
<>
 
            <div className="userchat-left">
                <Button   className="message-name-button-left" onClick={(e) => onClickHandler(e, fromwhoDecode)}>     { props.message.fromwho } </Button>
                <DropdownButton as={ButtonGroup} title=" " id="bg-vertical-dropdown">
                    <Dropdown.Item eventKey="1" onSelect={(e) => onSelectHandler(e, props.message.fromwho)} >Написать в приват</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Заблокировать</Dropdown.Item>
                </DropdownButton>
            </div>      
            <div className="messagechat">
                        {!props.message.imageastext && !props.message.youtubeastext && (props.message.textmessage)}
                        {props.message.imageastext && true && (
                            <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                        <Image src={'/uploadImages/' + props.message.imageastext} height={"auto"} width={200} alt="" />
                            </a>
                        )}
                        {props.message.imageastext &&false && (
                        <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                        <Image src={props.message.textmessage} height={"auto"} width={200} alt="" />
                            </a>
                        )}




                        {props.message.imageurl && (
                            <a className="imagechat" onClick={() => setLightBoxState({ photoIndex: 0, isOpen: true })}>
                                <Image src="https://localhost:7061/hidescreener.png" height={50} width={100} alt="" />
                            </a>
                        )}

                  

                        {props.message.imageurl && lightBoxState.isOpen && (
                            <Lightbox
                                mainSrc={props.message.imageurl}
                                onCloseRequest={() => setLightBoxState({ photoIndex: 0, isOpen: false })}
                            />
                        )}
                       
                        {!props.message.imageurl && lightBoxState.isOpen && (
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
                  </div>
            </>
    );
}
 