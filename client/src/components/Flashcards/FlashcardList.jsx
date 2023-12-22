import './index.scss';
import Flashcard from './Flashcard';
import { useQuery, useMutation, useQueryClient, useQueries } from 'react-query';
import { getLatestFlashcardSet, createNewFlashcardSet, getFlashcardsDateHeaders, getFlashcardSetById } from '../../api/apiFlashcard';
import { UserAuth } from '../../context/AuthContext';
import LoadingElement from '../LoadingElement/LoadingElement';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';


import Select from "react-select";




const FlashcardList = () => {

    const { token } = UserAuth();
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState(null);


    const { data: flashcardSet, isLoading: isLoadingFlashcard, isFetching } = useQuery({
        queryKey: ['flashcardSet'],
        queryFn: () => getLatestFlashcardSet(token),
        // onSuccess : (flashcardSet) => {
        //     console.log('set', flashcardSet)
        // }
    });


    const { data: datesArray, isLoading: isLoadingdates } = useQuery({
        queryKey: ['datesArray'],
        queryFn: () => getFlashcardsDateHeaders(token),
        // onSuccess: (datesArray) => {
        //     console.log('dates',datesArray)
        // }
    });


    const { data: flashcardSetId, isLoading: isLoadingFlashcardId, refetch } = useQuery({
        queryKey: ['flashcardSetId', selectedId],
        queryFn: () => getFlashcardSetById(token, selectedId),
        onSuccess:(flashcardSetId) => {
            console.log('ID', flashcardSetId)
        },
        enabled: !!selectedId
        
    });

    const flashcardData = selectedId ? flashcardSetId?.arrayOfObjects : flashcardSet?.arrayOfObjects;

    const handleOptionClick = (id) => {
        setSelectedId(id);
        console.log(id)
    };



    const { mutateAsync: createNewFlashcardSetMutation, isLoading: mutationIsLoading } = useMutation({
        mutationFn: () => createNewFlashcardSet(token),
        onSuccess: () => {
          queryClient.invalidateQueries(['flashcardSet']);
          queryClient.invalidateQueries(['datesArray']);

        }
    });


    if (mutationIsLoading, isLoadingFlashcard, isLoadingFlashcardId) return <LoadingElement />


    const displayDates = 
        datesArray?.sort((a, b) => 
                    new Date(b.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) 
                    - 
                    new Date(a.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")))
                  .map((item)=> {
        return <option onClick={() => handleOptionClick(item)} data-id={item} key={item}>{item}</option>
        
    });

    const dateOptions = displayDates?.map(date => ({ value: date, label: date }));


    const customStyles = {
        option: (defaultStyles, state) => ({
          ...defaultStyles,
          color: state.isSelected ? "#212529" : "black",
          backgroundColor: state.isSelected ? "grey" : "#ffedd2",
        }),
    
        control: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: "white",
          padding: "5px",
          width:'15rem',
          border: "none",
          borderRadius: '15px',
          boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
    };




    const renderFlashcards = flashcardData?.map(flashcard => {
        return <Flashcard flashcard={flashcard} key={flashcard.id}/>
    });
   
    
    return (
        <section className='flashcard-wrapper'>
            <div className='btns-container'>
                <div className='btns-container__header-wrapper'>
                    {/* <label className='label' htmlFor="dateSelect">Choose FlashcardSet:</label> */}
                    {/* <select className='btns-container__header'>
                       <option disabled>Select FlashcardSet</option>
                       {displayDates}   
                    </select> */}
                    <Select placeholder="Choose flashcard set" options={dateOptions} onChange={handleOptionClick}  styles={customStyles} />
                </div>  

                


                
                <Button 
                    text='Generate New FlashcardSet' 
                    backgroundColor='white' color='black' border='1px solid white' 
                    onClick={createNewFlashcardSetMutation}
                    width={'30%'}
                />
            </div>
     
            {flashcardData ? (
                <div className='flashcard-container'>{renderFlashcards}</div>
            ) : (
                <div className='no-flashcards-info-wrapper'>
                    <h1>No flashcards yet.</h1>
                    <h1>Go to Feeedback tab and</h1>
                    <h1>Generate feedback first!</h1>
                </div>
            )}
        </section>
    )
     
    
};

export default FlashcardList