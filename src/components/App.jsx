import AppSection from 'components/AppSection/AppSection';
import FeedbackComponent from 'components/FeedbackComponent/FeedbackComponent';
import FeedbackStatistics from './FeedbackStatistics/FeedbackStatistics';
import Notification from './Notification/Notification';
import React, { useState } from 'react';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    const countTotalFeedbackValue = countTotalFeedback();
    return countTotalFeedback
      ? Math.round((good / countTotalFeedbackValue) * 100)
      : 0;
  };
  const HandleClick = ({ target: { name } }) => {
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        break;
    }
  };
  const options = ['good', 'neutral', 'bad'];
  return (
    <div className="container">
      <AppSection title="Please leave feedback">
        <FeedbackComponent
          options={options}
          onLeaveFeedback={HandleClick}
        ></FeedbackComponent>
      </AppSection>
      {countTotalFeedback() > 0 ? (
        <AppSection title="Statistics">
          <FeedbackStatistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            count={countPositiveFeedbackPercentage}
          ></FeedbackStatistics>
        </AppSection>
      ) : (
        <Notification title="There is no feedback"></Notification>
      )}
    </div>
  );
}
