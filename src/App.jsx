import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faGear,
  faMessage,
  faCopyright,
  faSearch,
  faPlus,
  faEllipsisVertical,
  faFaceSmile
} from '@fortawesome/free-solid-svg-icons';
import { PiPaperPlaneRightFill } from "react-icons/pi";

const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageUrls: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 50,
};


function App() {
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
            <FontAwesomeIcon className="icons" icon={faGear} />
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
          <FontAwesomeIcon
            className="plus"
            icon={faPlus}
          />
          <div className="">
            <FontAwesomeIcon className="plus" icon={faFaceSmile} />
            <input type="text" id="Chat_text" placeholder="Type message here" />
            <FontAwesomeIcon className="plus" icon={faGear} />
            <button className="button">
              <PiPaperPlaneRightFill className="plus" />
            </button>
          </div>
        </div>
        <div className="background"></div> 
      </div>
    </>
  );
}
export default App;
