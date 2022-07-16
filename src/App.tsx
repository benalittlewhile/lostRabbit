import { useEffect, useRef, useState } from "react";
import Send from "./send";
import "./App.css";
import Bullet from "./components/Bullet";
import React from "react";
import { BulletProps } from "./types/bullet.types";

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

  /*
  old values:
  311 and 17.388 = predicted 17, actual 28 | 311 / 28 = 11.107
  580 and 23, predicted 23.9 actual 41 | 580 / 41 = 14.146
  1090 and 43.2, predicted 25.239 actual 42 = 25.95

  new values:
  width: 227, font size 11.2, predicted 20.27, actual 33
  width: 282.766, font size: 13.65, predicted: 20.715, actual 34
  width: 573.5, font size 26.88, predicted 21, actual 35
  width: 845.76, font size 39.27, predicted 21 actual 36
  */
  const [newInputVal, setNewInputval] = useState("");
  const [inputFontSize, setInputFontSize] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [predictedChars, setPredictedChars] = useState(0);

  const formInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const formInput = document.getElementById("newBulletInput");
  const [inputRows, setInputRows] = useState(1);

  const onNewBulletSubmit = () => {
    if (newInputVal) {
      const newBullet = {
        id: Math.floor(Math.random() * 4096),
        icon: "🍪",
        text: newInputVal,
      };
      setBullets([...bullets, newBullet]);
      setNewInputval("");
    }
  };

  const handleResize = () => {
    const formInput = formInputRef.current;
    if (formInput) {
      const formInputStyle = window.getComputedStyle(formInput);
      const rawInputSize = formInputStyle.fontSize;
      const rawInputWidth = formInputStyle.width;
      const calcFontSize = Number(rawInputSize.slice(0, -2));
      const calcInputWidth = Number(rawInputWidth.slice(0, -2)) - 16;
      setInputFontSize(calcFontSize);
      setInputWidth(calcInputWidth);

      const predictedChars = Math.round(
        0.50187 * calcInputWidth - 11.02113 * calcFontSize + 43.47352
      );

      setPredictedChars(predictedChars);
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
        {/* <h1>{window.innerWidth}</h1>
        <h1>input font size: {inputFontSize}</h1>
        <h1>input width: {inputWidth}</h1>
        <h1>predicted characters {predictedChars}</h1> */}

        <div className="fixed bottom-4 z-10 grid w-full justify-items-center">
          <div className="grid h-fit w-[95%] grid-cols-[2rem,12fr,2rem] justify-start rounded-2xl bg-slate-800 xl:max-w-[50%]">
            <div className="dropdown-top dropdown col-span-1 h-full w-full">
              <label
                tabIndex={0}
                className="btn w-full rounded-r-none px-1 text-2xl "
              >
                🚀
              </label>
              <div
                tabIndex={0}
                className="card dropdown-content card-compact mb-2 w-64 bg-sky-900  text-primary-content"
                onClick={() => {
                  document.getElementById("newBulletInput")?.focus();
                }}
              >
                <div className="card-body ">
                  <img src="https://static.wikia.nocookie.net/pokemon/images/a/ae/Professor_Cerise_Yamper.png/"></img>
                </div>
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
{
  // <div className="w-[90%]">
  //   <div className="form-control w-full">
  //     <div className="input-group w-full justify-center ">
  //       <div class="dropdown-top dropdown ">
  //         <label
  //           tabindex="0"
  //           class="btn btn-ghost rounded-btn aspect-square w-[10vw] bg-slate-800  text-white focus:bg-slate-800"
  //         >
  //           🚀
  //         </label>
  //         <div
  //           tabindex="0"
  //           class="card-compact card dropdown-content  w-64  bg-primary  text-primary-content shadow"
  //         >
  //           <div class="card-body">
  //             <h3 class="card-title">Card title!</h3>
  //             <p>you can use any element as a dropdown.</p>
  //           </div>
  //         </div>
  //       </div>
  //       {/* <button className="b-0 btn aspect-square w-12 border-slate-800 bg-slate-800 text-xl text-white focus:bg-slate-800 focus:outline-none">
  //         🚀
  //       </button> */}
  //       {/* <div className="dropdown-top dropdown">
  //         <label
  //           tabIndex={0}
  //           className="b-0 btn aspect-square bg-slate-800 outline-none focus:bg-slate-800 focus:outline-none"
  //         >
  //           🚀
  //         </label>
  //         <div
  //           tabIndex={0}
  //           className="card dropdown-content dropdown-start menu rounded-box card-compact h-[20vh] w-[60vw] bg-slate-800 p-2 shadow "
  //         ></div> */}
  //       {/* <ul tabIndex={0} className="dropdown-content menu w-52 p-2 shadow">
  //           <li>
  //             <a>item 1</a>
  //           </li>
  //           <li>
  //             <a>item 2</a>
  //           </li>
  //         </ul> */}
  //       {/* </div> */}
  //       <input
  //         type="text"
  //         placeholder="Bullet"
  //         className="w-full  bg-slate-800 px-2 text-white focus:outline-none"
  //       />
  //       <button
  //         className="w-30 btn btn-square border-none bg-slate-800
  //       outline-none  focus:bg-slate-800"
  //       >
  //         <Send className="fill-slate-500 p-1" />
  //       </button>
  //     </div>
  //   </div>
  // </div>
}
export default App;
