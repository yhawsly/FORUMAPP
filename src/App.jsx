import './App.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faGear,
  faMessage,
  faCopyright,
  faSearch,
  faPlus,
  faFile,
faImages,faEllipsisVertical,faFaceSmile,faCamera,faContactCard,faPoll,faFileAudio
} from '@fortawesome/free-solid-svg-icons';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Modal from './Modal';



const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageUrls: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 50,
};


function App() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [onClose,setOnClose] = useState(true);


      return (
    <>
      <div className="background">
        <div className="sidebar1">
          <div className>
            <img
              className="avatar"
              src={user.imageUrl}
              alt={"Photo of " + user.name}
              style={{
                width: user.imageSize,
                height: user.imageSize,
              }}
            />
            <p className="username">{user.name}</p>
          </div>
          <div className="icons">
            <FontAwesomeIcon className="icons" icon={faCopyright} />
            <br />
            <FontAwesomeIcon className="icons" icon={faMessage} />
            <br />
            <FontAwesomeIcon className="icons" icon={faBell} />
            <br />
            <div>
            <FontAwesomeIcon className="icons" icon={faGear} />
            </div>
          </div>
        </div>

        <div className="topics">
          <h2>Topics</h2>
          <div className="Search">
            <input type="text" placeholder="Search..." className="input" />
            <FontAwesomeIcon className="icon" icon={faSearch} />
          </div><br />
          <div className='card'>
            <img src={user.imageUrls} className='img_card' />
            <h2>PU Channel</h2>
          </div>
        </div>

        <div className="Nav">
          <li id="Ellipsis">
            <FontAwesomeIcon className="icons" icon={faEllipsisVertical} />
          </li>
          <h2 className="pool">#GOSPEL FUN FORUM #GOSPEL FUN FORUM #GOSPEL FUN FORUM </h2>
        </div>

        <div className="Chat">
          <div  className='modal'>
          <div onClick={()=>setIsOpen(!isOpen)}>
            <FontAwesomeIcon
            className="plus"
            icon={faPlus}
            />
          </div>
            <Modal isOpen={isOpen}  setIsOpen={setIsOpen}>

           
              <div className="modal-list">

                <div className='i'><FontAwesomeIcon className="plus" icon={faFile} />
                <label htmlFor="file">DOCUMENT</label>
                <input type="file" accept=".txt,.ppt/*" id="file"/>
                </div>
                <div className='i'><FontAwesomeIcon className="plus" icon={faImages}/>
                <label htmlFor="gallery">GALLERY</label>
                <input type="file" accept=".jpeg,png,jpg/*" id="gallery"/>
                </div>
                <div className='i'><FontAwesomeIcon className="plus" icon={faCamera}/>
                <label htmlFor="camera">CAMERA</label>
                <input type="file" accept="image/*" capture="user" id="camera"></input>
                </div>
                <div className='i'><FontAwesomeIcon className="plus" icon={faContactCard}/>
                <li>CONTACT</li></div>
                <div className='i'><FontAwesomeIcon className="plus" icon={faPoll}/><li>POLL</li></div>
                <div className='i'><FontAwesomeIcon className="plus" icon={faFileAudio}/>
                <label htmlFor="audio">AUDIO</label>
                <input type="file" accept=".mp4,.mp3,.mpv,.mkv/*" id="audio"/>
                </div>
              </div>
            </Modal>
            </div>
          <div className="">
            <FontAwesomeIcon className="plus" icon={faFaceSmile} />
            <input type="text" id="Chat_text" placeholder="Type message here" />
            
            <button className="button">
              <PiPaperPlaneRightFill className="plus" />
            </button>
          </div>
        </div>
              </div>
              <div className="background"></div> 
    </>
  );
}
export default App;
