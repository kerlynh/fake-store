import { BsHandbag } from "react-icons/bs";
import { TiMinus } from "react-icons/ti";

export function Logo2() {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div className="flex items-center space-x-2">
        <TiMinus className="text-green-900 text-md font-extrabold" />
        <div className="bg-white rounded-full w-10 h-10 border-[1.5px] border-green-900 flex items-center justify-center">
          <BsHandbag className="text-green-900 text-lg font-extrabold" />
        </div>
        <TiMinus className="text-green-900 text-md font-extrabold" />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <p className="font-extrabold text-green-900 text-sm">FAKE STORE</p>
      </div>
    </div>
  );
}
