import { useEffect, useRef, useState } from "react";
import Send from "./send";
import "./App.css";
import Bullet from "./components/Bullet";
import { BulletProps } from "./types/bullet.types";
import { EmojiPicker, unifiedToNative } from "react-twemoji-picker";
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css";
import Twemoji from "react-twemoji";
import BottomBar from "./components/BottomBar";
import { getLocalBullets, updateLocalStorage } from "./data/storage";

function App() {
  const [bullets, setBullets] = useState<BulletProps[]>(
    getLocalBullets
  );
    // []
  //   {
  //     id: 1,
  //     icon: "🚀",
  //     text: "Mooooooooooooooon",
  //   },
  //   {
  //     id: 2,
  //     icon: "💻",
  //     text: "lorem",
  //   },

  const emojiData = Object.freeze(EmojiData);

  /*
  TODO goes up here bcause reasons
  - Make the input resize itself correctly because grrrr
  - Make it a pwa (done!)
  -- Make it... idk, cache better? I can probably optimize this a little better
  depending on how I choose to deploy it
  - context menu on click the bullet to allow for deleting
  -- add categories (tabs)
  -- // could see about adding these as a tab bar that shows up at the top
  --- make the localstorage work with the categories
  ---- lazy load (from local, but maybe server later??) only the current category
  -- allow adding bullets to front or back of list
  -- allow sorting descending or ascending
  -- add real uuid for bullets
  -- test date/time records
  -- test bar color changing
  -- investigate animations
  -- themes and theme picker (there has to be a tailwind plugin for this)
  --- Change number of emoji in row to be smaller on smaller phones
  */

  /*
  width to # characters before input wrap
  360 : 27, wrap on 28
  414: 32, wrap on 33
  540: 45, wrap on 46
  */

  const addNewBullet = (newBullet: BulletProps) => {
    const mod = [...bullets, newBullet];
    setBullets(mod);
    updateLocalStorage(mod);
  };

  const AlwaysScrollToBottom = () => {
    const myRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      myRef.current?.scrollIntoView();
    });
    return <div ref={myRef}></div>;
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
        <AlwaysScrollToBottom />

        <BottomBar
          emojiData={emojiData}
          onNewBulletSubmit={addNewBullet}
        ></BottomBar>
      </div>
    </div>
  );
}
export default App;
