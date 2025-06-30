import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
  console.log(propertyList.length)

  const dispatch = useDispatch();
  // console.log(reservationList[0].customerId.firstName)
  // console.log(reservationList)
  // console.log(reservationList._id)

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <div className="divtitle">

      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      
      {/* {propertyList == 0 ? (
        <h2 className="title-list">
        You have no properties currently, kindly create one:{" "}
        <a href="/create-listing">Click Here to create one.</a>
        </h2>
        ) : reservationList.length == 0 ? (<h2 className="title-list">
        No Reservations currently for your properties.
        </h2>) : (<span></span>)} */}

      {(reservationList.length == 0) ? (
        <h2 className="title-list">
      No Reservations currently.
    </h2>  
      ) : (
        (<span></span>)
      )}

      <div className="flex-wrapper">
        <div className={`${reservationList.length==0 ?  "list_no": "list"}`}>
          {reservationList?.map(
            ({
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
              customerId,
            }) => (
              <ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking}
                reservationListFNAME={customerId.firstName}
                reservationListLNAME={customerId.lastName}
                reservationListEmail={customerId.email}
                myReserve={true}
                // reserveID={reservationList._id}
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

export default ReservationList;
