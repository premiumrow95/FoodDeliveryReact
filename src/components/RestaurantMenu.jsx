import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuAccordians from "./MenuAccordians";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowUp  } from "react-icons/fa";


const RestaurantMenu = () => {
  const { resId } = useParams();
  const menu = useRestaurantMenu(resId);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (menu === null) {
    return <Shimmer />;
  }

  let menuData = null;
  for (let i = 0; i < menu.cards.length; i++) {
    if (menu?.cards[i]?.card?.card?.info) {
      menuData = menu?.cards[i]?.card?.card?.info;
    }
  }

  // TOTAL 5 CARDS FOR NAME,CUISINES,COSTFORTWO - SEARCH ALL 5 CARDS FOR THIS DATA
  const {
    name,
    cuisines,
    costForTwoMessage,
    feeDetails,
    sla,
    areaName,
    totalRatingsString,
    avgRatingString,
  } = menuData || {};

  let itemCards = [];
  for (let i = 0; i < menu.cards.length; i++) {
    if (
      menu?.cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards[i]?.card?.card
        ?.itemCards
    ) {
      itemCards =
        menu.cards[i].groupedCard.cardGroupMap.REGULAR.cards[i].card.card
          .itemCards;
    }
  }

  // function findingData(data,whichCard){
  //   let removeQuotations = data.replace("", " ")
  //   for(let i = 0; i<menu.cards.length; i++ ){
  //     if(data){
  //       whichCard = data;
  //     }
  //   }
  // }

  // findingData("menu?.cards[i]?.card?.card?.info", menuData)
  // findingData("menu?.cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards[i]?.card?.card?.itemCards", itemCards)

  let categories = null;
  for (let i = 0; i < menu.cards.length; i++) {
    if (menu?.cards[i]?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
      categories = menu?.cards[
        i
      ]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (category) =>
          category.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    }
  }

  // menu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((category) => category.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" )
  // const categories = menu.cards[2].groupedCard.cardGroupMap.REGULAR.cards.filter(cat => cat.card.card{"@type"})
  // console.log(categories)
  // const { itemCards } = menu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || menu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || {};
  // console.log(categories)

  return (
    <div className="min-h-screen bg-[#264653] mt-3 pb-4 border-[5px] border-black font-extrabold flex flex-col items-center">
      <div className="text-[0.9rem] font-semibold text-left w-full text-white">
        <Link to="/" className="">
          Home{" "}
        </Link>
        <span className=""> / {name}</span>
      </div>

      <div className=" w-full h-36 p-2 flex items-center justify-between text-white">
        <div className="flex flex-col gap-1 px-4">
          <div className="font-bold text-3xl">{name}</div>
          <div className="text-xl font-medium">{cuisines?.join(", ")}</div>

          <div className="text-lg  font-medium">
            {areaName + ", " + sla?.lastMileTravelString}
          </div>
        </div>
        <div className="flex flex-col justify-center mr-4 rounded-lg border-2 w-[6rem] h-24 text-center bg-gray-800 text-white">
          <div className="flex items-center justify-center rounded-lg text-green-500 text-lg font-bold border-b-2 border-white">
            <FaStar className="mr-1" />
            {avgRatingString}
          </div>
          <div className="rounded-lg text-sm font-semibold tracking-tighter">
            {totalRatingsString}
          </div>
        </div>
      </div>
      <div className="w-[60vw] p-2 mt-2 text-white">
        <li className="font-extrabold text-[2rem]">Menu</li>
        {categories.map((sections) => (
          <MenuAccordians
            key={sections?.card?.card?.title}
            data={sections?.card?.card}
          />
        ))}
      </div>
      <Link
        to="#"
        onClick={scrollToTop}
        className="fixed bottom-7 right-20 text-white text-xl flex justify-center items-center gap-2 border-2 border-[#333333] bg-[#4381e5] p-2 w-[12rem] text-center rounded-md"
      >
        <FaArrowUp  className="text-xl"/>
        Go to Top
      </Link>
    </div>
  );
};

export default RestaurantMenu;
