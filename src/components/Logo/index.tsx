import { BsHandbag } from "react-icons/bs";
import { TiMinus } from "react-icons/ti";

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-3">
        <TiMinus className="text-green-900 text-4xl font-extrabold" />
        <div className="bg-white rounded-full w-20 h-20 border-[3px] border-green-900 flex items-center justify-center">
          <BsHandbag className="text-green-900 text-4xl font-extrabold" />
        </div>
        <TiMinus className="text-green-900 text-4xl font-extrabold" />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <p className="font-extrabold text-green-900 text-4xl">FAKE STORE</p>
      </div>
    </div>
  );
}
