
import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { GcosQuestions, GcosIntro } from './Questions.js'
import { GcosResults } from './Results.js'
import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <GcosApp/>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function GcosApp() {

  // Assume 17 questions, 3 answers for each
  // for testing, you can preset answers to non-zero values.
  var scoresArray = Array.from(Array(17), () => [0, 0, 0]);
  const [gcosScores, setGcosScores] = useState(scoresArray);
  const [questionCursor, setQuestionCursor] = useState(-1);

  const { isLoading: loadingQuestions,
          error: errorQuestions,
          data : questionData } = useQuery('questions', () =>
       fetch('/data/questions.json').then(res =>
         res.json()
       )
     )

  if (loadingQuestions) return 'Loading...'

  if (errorQuestions) return 'An error has occurred: ' + errorQuestions.message

  // update the Score for a particular question index, and subindex
  // (i.e. a possible response to that question)
  function updateScore(index, subindex, score) {

    // gcosScores is immutable so we need to work on a copy...
    // ... and since this will be a shallow copy, we also need to copy
    // the array containing the value we are acually modifying.
    var newScores = [...gcosScores];
    var newSubGroupScores = [...newScores[index]]
    newSubGroupScores[subindex] = score;
    newScores[index] = newSubGroupScores;
    setGcosScores(newScores);
  }

  function resetSurvey() {

    if (window.confirm("If you continue, you will lose all your answer data.")) {
      var newScores = Array.from(Array(17), () => [0, 0, 0]);
      setGcosScores(newScores);
      setQuestionCursor(-1);
    }
  }

  function moveCursor(delta) {
    var newCursor = questionCursor + delta;
    if (newCursor >= -1 && newCursor <= scoresArray.length) {
      setQuestionCursor(newCursor);
    }
  }

  if (questionCursor < 0) {
    return (
        <>
          <div id="questions">
            <GcosIntro
             cursor = {questionCursor}
             moveCursor = {moveCursor}/>
          </div>
        </>
    );
  }
  else if (questionCursor < scoresArray.length) {

    return (
        <>
          <div id="questions">
            <GcosQuestions
             questions = {questionData['questions']}
             cursor = {questionCursor}
             scores = {gcosScores}
             setScore = {updateScore}
             moveCursor = {moveCursor}/>
          </div>
        </>
    );
  }
  else {
    return (
      <>
        <div id="results">
          <GcosResults
           coding = {questionData['coding']}
           distribution = {questionData['distribution']}
           scores = {gcosScores}
           moveCursor = {moveCursor}
           resetSurvey = {resetSurvey}/>
        </div>
      </>
    );
  }
};

export default App;
