
import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { GcosQuestions } from './Questions.js'
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
  var scoresArray = Array.from(Array(17), () => [0, 0, 0]);
  const [gcosScores, setGcosScores] = useState(scoresArray);
  const [questionCursor, setQuestionCursor] = useState(0);

  const { isLoading: loadingQuestions,
          error: errorQuestions,
          data : questionData } = useQuery('questions', () =>
       fetch('/data/questions.json').then(res =>
         res.json()
       )
     )

  if (loadingQuestions) return 'Loading...'

  if (errorQuestions) return 'An error has occurred: ' + errorQuestions.message

  function updateScore(index, subindex, score) {
    var newScores = gcosScores;
    newScores[index][subindex] = score;
    setGcosScores(newScores);
  }

  function moveCursor(delta) {
    var newCursor = questionCursor + delta;
    if (newCursor >= 0 && newCursor < scoresArray.length) {
      setQuestionCursor(newCursor);
    }
  }

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
        <div id="results">
          <GcosResults
           coding = {questionData['coding']}
           scores = {gcosScores}/>
        </div>
      </>
  );
};

export default App;
