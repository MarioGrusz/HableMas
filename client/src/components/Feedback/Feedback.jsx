import "./index.scss";
import ButtonCircle from "../ButtonCircle/ButtonCircle";
import formatRawFeedbackData from "./utils/formatedFeedback";
import {
  getLatestFeedback,
  getNewFeedbackFromOpenAI,
} from "../../api/apiFeedback";
import { UserAuth } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import LoadingElement from "../LoadingElement/LoadingElement";

const Feedback = () => {
  const { token } = UserAuth();
  const queryClient = useQueryClient();

  const {
    data: feedback,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: () => getLatestFeedback(token),
  });

  const { mutate: getNewFeedbackMutation, isLoading: mutationIsLoading } =
    useMutation({
      mutationFn: () => getNewFeedbackFromOpenAI(token),
      onSuccess: () => {
        queryClient.invalidateQueries(["feedback"]);
      },
    });

  console.log("feedback", feedback);

  return (
    <div className="feedback-wrapper">
      <ButtonCircle
        onClick={getNewFeedbackMutation}
        disabled={mutationIsLoading}
        text="New Feedback"
        backgroundColor="#7a5af5"
        color="white"
        border="none"
        alignSelf={"flex-end"}
      />

      {isLoading || isFetching || mutationIsLoading ? (
        <LoadingElement />
      ) : (
        <>
          {feedback && feedback?.feedback?.length > 0 ? (
            <div>{formatRawFeedbackData(feedback)}</div>
          ) : (
            <div className="no-feedback">
              <p>No Feedback found!</p>
              <p>Click 'New Feedback' button</p>
              <p>To generate new one!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Feedback;
