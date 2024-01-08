import "./index.scss";
import Flashcard from "./Flashcard";
import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";
import {
  getLatestFlashcardSet,
  createNewFlashcardSet,
  getFlashcardsDateHeaders,
  getFlashcardSetById,
} from "../../api/apiFlashcard";
import { UserAuth } from "../../context/AuthContext";
import LoadingElement from "../LoadingElement/LoadingElement";
import { useEffect, useState } from "react";
import ButtonCircle from "../ButtonCircle/ButtonCircle";

import Select from "react-select";

const FlashcardList = () => {
  const { token } = UserAuth();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);

  const {
    data: flashcardSet,
    isLoading: isLoadingFlashcard,
    isFetching,
  } = useQuery({
    queryKey: ["flashcardSet"],
    queryFn: () => getLatestFlashcardSet(token),
  });

  const { data: datesArray, isLoading: isLoadingdates } = useQuery({
    queryKey: ["datesArray"],
    queryFn: () => getFlashcardsDateHeaders(token),
  });

  const {
    data: flashcardSetId,
    isLoading: isLoadingFlashcardId,
    refetch,
  } = useQuery({
    queryKey: ["flashcardSetId", selectedId],
    queryFn: () => getFlashcardSetById(token, selectedId),
    onSuccess: (flashcardSetId) => {
      console.log("ID", flashcardSetId);
    },
    enabled: !!selectedId,
  });

  const flashcardData = selectedId
    ? flashcardSetId?.arrayOfObjects
    : flashcardSet?.arrayOfObjects;

  const handleOptionClick = (selectedOption) => {
    if (selectedOption.value) {
      setSelectedId(selectedOption.value.key);
      console.log(selectedOption.value.key);
    }
  };

  const {
    mutateAsync: createNewFlashcardSetMutation,
    isLoading: mutationIsLoading,
  } = useMutation({
    mutationFn: () => createNewFlashcardSet(token),
    onSuccess: () => {
      queryClient.invalidateQueries(["flashcardSet"]);
      queryClient.invalidateQueries(["datesArray"]);
    },
  });

  if ((mutationIsLoading, isLoadingFlashcard, isLoadingFlashcardId))
    return <LoadingElement />;

  const displayDates = datesArray
    ?.sort(
      (a, b) =>
        new Date(b.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) -
        new Date(a.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
    )
    .map((item) => {
      return (
        <option
          onClick={() => handleOptionClick(item)}
          data-id={item}
          key={item}
        >
          {item}
        </option>
      );
    });

  const dateOptions = displayDates?.map((date) => ({
    label: date,
    value: date,
  }));

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,

      backgroundColor: state.isSelected || state.isFocused ? "lightgray" : null,
      color: state.isSelected || state.isFocused ? "black" : "blue",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "white",
      padding: "5px",
      width: "13rem",
      border: "none",
      borderRadius: "15px",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
  };

  const renderFlashcards = flashcardData?.map((flashcard) => {
    return <Flashcard flashcard={flashcard} key={flashcard.id} />;
  });

  return (
    <section className="flashcard-wrapper">
      <p className="flashcard-info">Flashcard set based on recent feedback</p>
      <div className="btns-container">
        <div className="btns-container__header-wrapper">
          <Select
            placeholder="Choose set"
            options={dateOptions}
            onChange={handleOptionClick}
            styles={customStyles}
            value={selectedId ? "idid" : null}
          />
        </div>

        <ButtonCircle
          text="Generate New Set"
          backgroundColor="white"
          color="black"
          onClick={createNewFlashcardSetMutation}
        />
      </div>

      {flashcardData ? (
        <div className="flashcard-container">{renderFlashcards}</div>
      ) : (
        <div className="no-flashcards-info-wrapper">
          <h1>No flashcards found.</h1>
        </div>
      )}
    </section>
  );
};

export default FlashcardList;
