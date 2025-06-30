import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
  // console.log(user);
  console.log(propertyList.length)

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <div className="divtitle">

      <Navbar />
      <h1 className="title-list">Your Property List:</h1>

      { 
        (propertyList.length==0) ?(<h2 className="title-list">You have no properties listed, <a href="/create-listing">Click here to create one.</a> </h2>) : (<span></span>) 
      }

      <div className="flex-wrapper">
        <div className={`${propertyList.length==0 ?  "list_no": "list"}`}>
          {propertyList?.map(
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
                myProp={true}
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

export default PropertyList;
