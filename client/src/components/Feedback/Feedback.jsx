import './index.scss';
import Button from '../Button/Button';
import formatRawFeedbackData from './utils/formatedFeedback';
import { getLatestFeedback, getNewFeedbackFromOpenAI } from '../../api/apiFeedback';
import { UserAuth } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import LoadingElement from '../LoadingElement/LoadingElement';


const Feedback = () => {

  const { token } = UserAuth();
  const queryClient = useQueryClient();


  const { data: feedback, isLoading, isFetching } = useQuery({
    queryKey: ['feedback'],
    queryFn: () => getLatestFeedback(token),
  });

  const { mutate: getNewFeedbackMutation, isLoading: mutationIsLoading } = useMutation({
    mutationFn: () => getNewFeedbackFromOpenAI(token),
    onSuccess: () => {
      queryClient.invalidateQueries(['feedback'])
    }
  });


  console.log('feedback', feedback.feedback)


 
  return (


    <div className='feedback-wrapper'>

      <Button 
      onClick={getNewFeedbackMutation}
      disabled={mutationIsLoading} 
      text='Generate New Feedback'  
      backgroundColor='transparent' color='black' border='1px solid black' 
      />

      {isLoading || isFetching || mutationIsLoading  ? (
        <LoadingElement />
      ) : (
        <> 
          {feedback && <div>{formatRawFeedbackData(feedback)}</div>}
        </>
      )}  

  
    </div>
  );
};

export default Feedback;