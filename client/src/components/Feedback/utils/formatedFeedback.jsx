const formatRawFeedbackData = (data) => {

  if (!data) {
    return null;
  }

  const feedbackData = data?.feedback[0] || [];
  const feedbackDate = data?.date || [];

    
  const formattedFeedback = feedbackData.map((message, index) => {
    const lines = message.split('\n');
    const formattedLines = lines.map((line, lineIndex) => {

      return <p key={lineIndex}>{line}</p>;
      
    });

    return (
      <div key={index}>
        <p>{feedbackDate}</p>
        <div>{formattedLines}</div>
      </div>
    );
  });
  return formattedFeedback;
};

export default formatRawFeedbackData;