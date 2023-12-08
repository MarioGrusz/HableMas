import './index.scss';
import Flashcard from './Flashcard';
import { useQuery, useMutation, useQueryClient, useQueries } from 'react-query';
import { getLatestFlashcardSet, createNewFlashcardSet, getFlashcardsDateHeaders, getFlashcardSetById } from '../../api/apiFlashcard';
import { UserAuth } from '../../context/AuthContext';
import LoadingElement from '../LoadingElement/LoadingElement';
import { useState } from 'react';
import Button from '../Button/Button';


const FlashcardList = () => {

    const { token } = UserAuth();
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState(null);


    const { data: flashcardSet, isLoading: isLoadingFlashcard, isFetching } = useQuery({
        queryKey: ['flashcardSet'],
        queryFn: () => getLatestFlashcardSet(token),
        onSuccess: (flashcardSet) => {
            console.log(flashcardSet)
        }
    });


    const { data: datesArray, isLoading: isLoadingdates } = useQuery({
        queryKey: ['datesArray'],
        queryFn: () => getFlashcardsDateHeaders(token),
    });


    const { data: flashcardSetId, isLoading: isLoadingFlashcardId, refetch } = useQuery({
        queryKey: ['flashcardSetId', selectedId],
        queryFn: () => getFlashcardSetById(user, selectedId),
        enabled: !!selectedId
        
    });

    const flashcardData = selectedId ? flashcardSetId?.arrayOfObjects : flashcardSet?.arrayOfObjects;

    const handleOptionClick = (id) => {
        setSelectedId(id);
    };


    const { mutateAsync: createNewFlashcardSetMutation, isLoading: mutationIsLoading } = useMutation({
        mutationFn: () => createNewFlashcardSet(token),
        onSuccess: () => {
          queryClient.invalidateQueries(['flashcardSet']);
          queryClient.invalidateQueries(['datesArray']);

        }
    });


    if (mutationIsLoading) return <LoadingElement />


    const displayDates = 
        datesArray?.sort((a, b) => 
                    new Date(b.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) 
                    - 
                    new Date(a.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")))
                  .map((item)=> {
        return <option onClick={() => handleOptionClick(item)} data-id={item} key={item}>{item}</option>
        
    });


    const renderFlashcards = flashcardData?.map(flashcard => {
        return <Flashcard flashcard={flashcard} key={flashcard.id}/>
    });
   
    
    return (
        <>
            {flashcardData ? (

                <>  
                    <div className='btns-container'>
                        <div className='btns-container__header-wrapper'>
                            <label className='label' htmlFor="dateSelect">Choose FlashcardSet:</label>
                            <select className='btns-container__header'>
                                <option disabled>Select FlashcardSet</option>
                                {displayDates}    
                            </select>
                        </div>   
                        
                        <Button 
                            text='Generate New FlashcardSet'  
                            backgroundColor='transparent' color='black' border='1px solid black' 
                            onClick={createNewFlashcardSetMutation}
                        />
                    </div>

                    <div className='flashcard-container'>{renderFlashcards}</div>
                </> 

                ) : (

                <div className='no-flashcards-info-wrapper'>
                    <h1>No flashcards yet.</h1>
                    <h1>Go to Feeedback tab and</h1>
                    <h1>Generate feedback first! Venga!</h1>
                </div>

                )
            }

        </>
    )
    
}

export default FlashcardList