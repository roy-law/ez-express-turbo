import { PublicNavBarTabs } from "../components/PublicNavBarTabs";
import PriceList from "../assets/pricelist.png";

export function Landing() {
  return (
    <main>
      <PublicNavBarTabs />
      <main
        className="flex justify-center items-center flex-col
      "
      >
        <img src={PriceList} alt="" />
        {/* <p className="text-3xl md:text-6xl lg:text-8xl pb-8">Toronto</p>
        <p className="animate-typing overflow-hidden whitespace-nowrap border-r-white text-3xl md:text-6xl lg:text-8xl text-black h-[200px] text-center">
          Easy One Day Delivery
        </p> */}
      </main>
      <footer className="bg-white">
        <div className="mx-auto">
          <div className="-mt-10">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2023 Ez Express Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
