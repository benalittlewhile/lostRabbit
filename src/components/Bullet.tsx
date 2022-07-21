import { BulletProps } from "../types/bullet.types";
import Twemoji from "react-twemoji";

export default function Bullet(props: BulletProps) {
  const { id, icon, text } = props;

  return (
    <div className="grid w-[100%] grid-cols-[3rem,1fr] items-center rounded-md bg-slate-800  p-0 py-2 text-white xsm:w-[90%]">
      {/* could set a custom line color here for signaling */}
      <div className="h-full w-[3rem] border-r-2 border-r-slate-500 py-1">
        <h1 className="m-auto align-middle text-2xl">
          <Twemoji>{icon}</Twemoji>
        </h1>
      </div>
      <p className="px-2 text-start text-base">{text}</p>
    </div>
  );
}
