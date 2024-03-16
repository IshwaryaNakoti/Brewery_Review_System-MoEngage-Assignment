"use client";
import Navbar from "../../../components/Navbar";
import { Box, Button, Rating, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const BreweryInfo = ({ params }) => {
  const id = params.id;
  const [breweryData, setBreweryData] = useState({});
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  function getLabelText(value) {
    return `${value}`;
  }
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return null;
    }

    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return totalRating / reviews.length;
  };

  useEffect(() => {
    axios
      .get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((response) => {
        setBreweryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get("/api/reviews/getreviews", {
        data: {
          brewery: id,
        },
      })
      .then((response) => {
        setReviews(response.data);
        const filteredReviews = response.data.data.filter(
          (review) => review.brewery === id
        );
        const avgRating = calculateAverageRating(filteredReviews);
        setAverageRating(avgRating);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post("/api/reviews/postreview", {
        brewery: id,
        rating: value,
        description: description,
      });

      setValue(0);
      setDescription("");
      window.location.reload();
    } catch (error) {
      console.error("Review submission failed", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-left  min-h-screen py-2"
      style={
        {
          position: "relative",
          overflow: "auto",
          backgroundImage: "url('data:image/jpeg;base64,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')", 
          backgroundRepeat: "no-repeat", 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          paddingLeft:"15px"
        }
      }
      >
        <div className="my-3 w-3/4">
          <h1 className="text-3xl text-left font-bold" style={{fontFamily:"calibri"}}>{breweryData.name}</h1>
          <div className=" flex items-left justify-around mt-4 ">
            <div>
              <p className="mb-2 text-lg">
                <span className="font-bold">Brewery Type: </span>
                {breweryData.brewery_type}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold">Address: </span>{" "}
                {breweryData.address_1}
                {breweryData.address_2 !== null && ` ${breweryData.address_2}`}
                {breweryData.address_3 !== null && ` ${breweryData.address_3}`}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold">City: </span> {breweryData.city}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold">State: </span> {breweryData.state}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg">
                <span className="font-bold">State Province: </span>{" "}
                {breweryData.state_province}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold">Postal Code: </span>{" "}
                {breweryData.postal_code}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold">Street: </span> {breweryData.street}
              </p>
              
              <p className="mb-2 text-lg">
                <span className="font-bold">Latitude: </span>{" "}
                {breweryData.latitude}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg">
                <span className="font-bold">Phone: </span> {breweryData.phone}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-bold ">Website: </span>
                <a
                  href={breweryData.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {breweryData.website_url}
                </a>
              </p>
              
              <p>
                <span className="mb-3 text-lg font-bold">Average Rating: </span>
                {averageRating !== null
                  ? averageRating.toFixed(1)
                  : "No reviews yet"}
              </p>
              <p className="mt-2 text-lg">
                <span className="font-bold">Longitude: </span>{" "}
                {breweryData.longitude}
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 w-3/4">
          <div className="bg-gray-100 rounded p-4 mt-4">
          <h1 className="text-2xl font-bold" style={{fontFamily:"calibri", fontSize: "20px"}}>Add a comment...</h1>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              placeholder="Enter Review"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-1 rounded border"
            />
            <div className="flex items-center my-2" style={{fontFamily:"calibri", fontSize: "20px"}}>
              <p>How much do you rate?</p>
              <Rating
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              
            </div>
            <Button
              variant="contained"
              onClick={handleReviewSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </Button>
            <div className="bg-gray-100 rounded p-4 mt-4">
              <h2 className="text-xl font-bold"
              style={{
                marginBottom: "0.5rem"
              }}
              >Comments</h2>
              <hr style={{ width: "100%", marginBottom: "1rem" }} />
              {reviews?.data && (
                <ul>
                  {reviews?.data.map((review) => {
                    if (review.brewery === id) {
                      return (
                        <li key={review._id} className="mb-4">
                          <div className="flex">
                            <p className="text-lg font-semibold mr-2">
                              {review.username}
                            </p>
                            <Rating disabled value={review.rating} />
                          </div>
                          <p className="text-lg mb-4" style={{fontFamily:"calibri"}}>Feedback: {review.description}</p>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default BreweryInfo;
