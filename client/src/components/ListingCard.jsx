import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
  reservationListFNAME,
  reservationListLNAME,
  reservationListEmail,
  myTrip,
  myProp,
  myReserve,
  bookingID,
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [myTripVar,setMyTripVar]=useState(false)

  // if(myTrip==true)
  // {setMyTripVar(true)}

  // console.log(myTrip)
  // console.log(bookingID)

  // Cancel Code

  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  const handleCancelBooking = async (bId) => {
    const checkConfirm = window.confirm("Are you sure you want to cancel booking?");
    if (checkConfirm) {
      try {
        const response = await fetch(
          `http://localhost:3001/bookings/user/${bId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          navigate("/")
          alert("Cancellation Successfull")
          // console.log("Success");
        } else {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.message);
        // Optionally redirect or update UI
        // navigate(`/${customerId}/trips`);
      } catch (err) {
        console.error("Cancel Booking Failed:", err.message);
        // alert('Cancellation failed, please try again later.');
      }
    } else {
    }
  };

  //cancel code

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const customerId = useSelector((state) => state?.reservationList);

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  // const myVar=user.reservationList[0].customerId.firstName;
  // const myVar=user.reservationList.length
  // const myVar=user.reservationList
  // console.log(myVar)
  // console.log(reservationListEmail)
  // console.log(myTrip)

  // const names = user.reservationList.map((item) => item.customerId.firstName);

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p>
            <span>₹{price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>₹{totalPrice}</span> total
          </p>

          {!myTrip ? (
            <>
              <div>
                <p>Booked by:</p>
                <p>
                  Name :{" "}
                  <span>
                    {" "}
                    {reservationListFNAME} {reservationListLNAME}
                  </span>
                </p>
                <p>Email: {reservationListEmail}</p>
              </div>
            </>
          ) : (
            <>
              <button
                className="favorite_del"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelBooking(bookingID);
                }}
              >
                <CancelIcon />
              </button>
            </>
          )}
        </>
      )}

      <button
        className={` ${myTrip || myProp || myReserve ? "favorite_no" : "favorite"}`}
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
