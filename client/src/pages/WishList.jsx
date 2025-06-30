import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  

  return (
    <>
      <div className="divtitle">
      <Navbar />
      
      <h1 className="title-list">Your Wish List: </h1>
      {(wishList.length==0) ? (<h2 className="title-list">Your Wishlist is Empty.</h2>) : (<span style={{"background-color":"white"}}></span>)}
      
      <div className="flex-wrapper">
        <div className={`${wishList.length==0 ?  "list_no": "list"}`}>
          {wishList?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
        <Footer />
      </div>
      </div>
    </>
  );
};

export default WishList;
