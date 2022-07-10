import { useEffect, useRef, useState } from "react";
import Send from "./send";
import "./App.css";
import Bullet from "./components/Bullet";
import React from "react";

function App() {
  const [bullets, setBullets] = useState([
    {
      icon: "🚀",
      text: "Mooooooooooooooon",
    },
    {
      icon: "💻",
      text: "lorem",
    },
  ]);

  // several parts of this are going to be hacky for today, and that's alright

  const [newInputVal, setNewInputval] = useState("");
  const [inputFontSize, setInputFontSize] = useState(0);
  const [inputWidth, setInputWidth] = useState(0)

  const formInputRef = useRef(null);
  useEffect(() => {
    // this needs to be reworked, only works on initial render for the moment
    const formInput = formInputRef.current;
    const formInputStyle = window.getComputedStyle(formInput);
    const rawInputSize = formInputStyle.fontSize;
    const rawInputWidth = formInputStyle.width;
    setInputFontSize(Number(rawInputSize.slice(0,-2)));
    setInputWidth(Number(rawInputWidth.slice(0,-2)));


  }, [])
  // const formInput = document.getElementById("newBulletInput");

  const [inputRows, setInputRows] = useState(1);

  const onNewBulletSubmit = () => {
    if(newInputVal) {
      const newBullet = {
        icon: "🍪",
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
          return <Bullet icon={bullet.icon} text={bullet.text} />;
        })}
        {bullets.length > window.innerHeight / 75 ? (
          <div className="min-h-[10vh] w-full">&nbsp;</div>
        ) : (
          <></>
        )}
        <h1>{inputFontSize}</h1>
        <h1>{inputWidth}</h1>
        <h1>{inputWidth/inputFontSize}</h1>
        <div className="fixed bottom-8 z-10 grid w-full justify-items-center">
          <div className="flex h-fit w-[95%] flex-row justify-start rounded-2xl bg-slate-800 ">
            <div className="dropdown-top dropdown h-fit w-fit">
              <label
                tabIndex={0}
                className="btn h-auto min-h-[10vw] w-[10vw] rounded-r-none text-[5vw] sm:text-[4.5vw] "
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
            <input
              type="text"
              placeholder="Bullet"
              className="min-h-[10vw] h-auto  w-full max-w-full flex-grow bg-slate-800 px-2 text-[4.2vw] text-white focus:outline-none sm:text-[3vw] text-left flex  items-center"
              id="newBulletInput"
              ref={formInputRef}
              value={newInputVal}
              onChange={(e) => {
                setNewInputval(e.target.value);
              }}
              onSubmit={onNewBulletSubmit}
              onKeyDown={(e) => handleKeyDown(e.key)}
            ></input>
            <button
              className="btn textarea h-[10vw] min-h-fit
              w-[10vw]  border-none bg-slate-800 p-0 px-1 outline-none focus:bg-slate-800"
              onClick={onNewBulletSubmit}
            >
              <Send className="aspect-square h-full w-full fill-slate-500 px-1 xsm:w-8" />
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
