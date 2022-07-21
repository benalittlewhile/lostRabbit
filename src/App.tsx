import { useRef, useState } from "react";
import Send from "./send";
import "./App.css";
import Bullet from "./components/Bullet";
import { BulletProps } from "./types/bullet.types";
import { EmojiPicker, unifiedToNative } from "react-twemoji-picker";
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css";
import Twemoji from "react-twemoji";
import BottomBar from "./components/BottomBar";

function App() {
  const [bullets, setBullets] = useState<BulletProps[]>([
    {
      id: 1,
      icon: "🚀",
      text: "Mooooooooooooooon",
    },
    {
      id: 2,
      icon: "💻",
      text: "lorem",
    },
  ]);

  const emojiData = Object.freeze(EmojiData);

  /*
  TODO goes up here bcause reasons
  - Change background color of html or body so that the keyboard doesn't reveal
  white when it moves
  - Change number of emoji in row to be smaller on smaller phones
  - Implement data saving and retrieval (localstorage json go brrrrr)
  - Make the input resize itself correctly because grrrr
  - Refactor bullet list and input to their own components
  - Make it a pwa
  -- add categories
  -- add real uuid for bullets
  -- test date/time records
  -- test bar color changing
  -- investigate animations
  -- themes and theme picker (there has to be a tailwind plugin for this)
  */

  /*
  width to # characters before input wrap
  360 : 27, wrap on 28
  414: 32, wrap on 33
  540: 45, wrap on 46
  */

  const addNewBullet = (newBullet: BulletProps) => {
    setBullets([...bullets, newBullet]);
  };

  return (
    <div className="App h-screen w-full bg-slate-500">
      <div className="flex h-full w-full flex-col items-center gap-y-2 overflow-auto overflow-y-scroll p-3">
        {bullets.map((bullet) => {
          return (
            <Bullet
              id={bullet.id}
              key={bullet.id}
              icon={bullet.icon}
              text={bullet.text}
            />
          );
        })}
        {bullets.length > window.innerHeight / 75 ? (
          <div className="min-h-[10vh] w-full">&nbsp;</div>
        ) : (
          <></>
        )}

        <BottomBar
          emojiData={emojiData}
          onNewBulletSubmit={addNewBullet}
        ></BottomBar>
      </div>
    </div>
  );
}
export default App;
