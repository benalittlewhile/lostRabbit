import { useRef, useState } from "react";
import Send from "./send";
import "./App.css";
import Bullet from "./components/Bullet";
import { BulletProps } from "./types/bullet.types";
import { EmojiPicker, unifiedToNative } from "react-twemoji-picker";
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css";

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
  - Use twemoji for bullets and input
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
  const [newInputVal, setNewInputval] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState("🚀");
  // const [inputRows, setInputRows] = useState(1);

  const formInputRef = useRef<HTMLInputElement>(null);

  const onNewBulletSubmit = () => {
    if (newInputVal) {
      const newBullet = {
        id: Math.floor(Math.random() * 4096), // TODO - add real uuid
        icon: currentEmoji,
        text: newInputVal,
      };
      setBullets([...bullets, newBullet]);
      setNewInputval("");
    }
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      onNewBulletSubmit();
    }
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
        {/* <EmojiPicker /> */}

        <div className="fixed bottom-4 z-10 grid w-full justify-items-center">
          <div className="grid h-fit w-[95%] grid-cols-[3rem,12fr,2rem] justify-start rounded-2xl bg-slate-800 xl:max-w-[50%]">
            <div className="dropdown dropdown-top col-span-1 h-full w-full">
              <label
                tabIndex={0}
                className="btn w-full rounded-r-none px-1 text-2xl "
              >
                {currentEmoji}
              </label>
              <div
                tabIndex={0}
                className="card dropdown-content card-compact mb-2  bg-sky-900  text-primary-content "
              >
                <EmojiPicker
                  emojiData={emojiData}
                  theme="dark"
                  showNavbar={true}
                  onEmojiSelect={(emoji) => {
                    setCurrentEmoji(unifiedToNative(emoji.unicode));
                    document.getElementById("newBulletInput")?.focus();
                  }}
                />
              </div>
            </div>
            <div className="col-span-1 flex w-full items-center">
              <input
                type="text"
                placeholder="Bullet"
                className="flex h-fit min-h-[1vh] w-full max-w-full flex-grow items-center bg-slate-800 px-2 text-left text-base text-white focus:outline-none"
                autoComplete="off"
                id="newBulletInput"
                ref={formInputRef}
                value={newInputVal}
                onChange={(e) => {
                  setNewInputval(e.target.value);
                }}
                onSubmit={onNewBulletSubmit}
                onKeyDown={(e) => handleKeyDown(e.key)}
              ></input>
            </div>
            <button
              className="btn textarea col-span-1 min-h-fit
               w-full rounded-l-none border-none bg-slate-800 p-[0.1rem] outline-none focus:bg-slate-800 focus:outline-none"
              onClick={onNewBulletSubmit}
            >
              <Send className="aspect-square h-auto w-full fill-slate-500 px-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
