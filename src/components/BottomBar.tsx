import { useRef, useState } from "react";
import Twemoji from "react-twemoji";
import { EmojiPicker, unifiedToNative } from "react-twemoji-picker";
import Send from "../send";
import { BottomBarProps } from "../types/bullet.types";

export default function (props: BottomBarProps) {
  const { emojiData, onNewBulletSubmit } = {
    ...props,
  };
  const formInputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputval] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState("🚀");

  const submit = () => {
    onNewBulletSubmit({
      id: Math.floor(Math.random() * 4096), // TODO - add real uuid
      icon: currentEmoji,
      text: inputVal,
    });

    setInputval("");
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      submit();
    }
  };

  return (
    <div className="fixed bottom-4 z-10 grid w-full justify-items-center">
      <div className="grid h-fit w-[95%] grid-cols-[3rem,12fr,2rem] justify-start rounded-2xl bg-slate-800 xl:max-w-[50%]">
        <div className="dropdown dropdown-top col-span-1 h-full w-full">
          <label
            tabIndex={0}
            className="btn w-full rounded-r-none px-1 text-2xl "
          >
            <Twemoji>{currentEmoji}</Twemoji>
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
            value={inputVal}
            onChange={(e) => {
              setInputval(e.target.value);
            }}
            onSubmit={submit}
            onKeyDown={(e) => handleKeyDown(e.key)}
          ></input>
        </div>
        <button
          className="btn textarea col-span-1 min-h-fit
               w-full rounded-l-none border-none bg-slate-800 p-[0.1rem] outline-none focus:bg-slate-800 focus:outline-none"
          onClick={submit}
        >
          <Send className="aspect-square h-auto w-full fill-slate-500 px-1" />
        </button>
      </div>
    </div>
  );
}
