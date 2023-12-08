import React, { useRef, useEffect } from "react";
import MapPlaceDetails from "../MapPlaceDetails/MapPlaceDetails";
import Loading from "../../components/Spinner/Loading";
import MapShortPlaceDetails from "../MapShortPlaceDetails/MapShortPlaceDetails";

const MapResults = (props) => {
  const {
    places,
    chosenPlace,
    setChosenPlace,
    placeClicked,
    isLoading,
    setIsLoading,
    handleMoreButtonClick,
    isMoreButtonDisabled,
  } = props;

  const placeClickedRef = useRef(null);

  useEffect(() => {
    // Check if there is a chosen place and the ref is defined
    if (placeClicked && placeClickedRef.current) {
      // Scroll the chosen place into view
      placeClickedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [placeClicked]);

  const handleChoosingPlace = (place) => {
    setChosenPlace(place);
  };

  return (
    <div className="overflow-y-auto h-[28.875rem] p-2">
      {chosenPlace !== null ? (
        <MapPlaceDetails
          chosenPlace={chosenPlace}
          setChosenPlace={setChosenPlace}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : isLoading ? (
        <Loading />
      ) : places.length !== 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          {places.map((place, i) => (
            <div
              className="w-full"
              ref={placeClicked === place ? placeClickedRef : null}
            >
              <MapShortPlaceDetails
                place={place}
                handleChoosingPlace={handleChoosingPlace}
              />
            </div>
          ))}
          {isMoreButtonDisabled ? (
            <button className="px-4 py-2 rounded-md text-lg bg-accent-900 text-accent-300 cursor-default">
              Load More
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-md text-lg bg-primary-900 text-background-color hover:bg-primary-700 ease-in-out duration-150"
              onClick={handleMoreButtonClick}
            >
              Load More
            </button>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-lg text-accent-300">
            Please let us know which places you are searching for.
          </h1>
        </div>
      )}
    </div>
  );
};

export default MapResults;