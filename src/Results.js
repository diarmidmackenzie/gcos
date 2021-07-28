

export function GcosResults(props) {

  // calculate scores for A, I and C.
  var aScore = totalScore(props.coding.A,
                          props.scores);
  var cScore = totalScore(props.coding.C,
                          props.scores);
  var iScore = totalScore(props.coding.I,
                          props.scores);

  // combine coding series + scores to get a total score for
  // A, I or C.
  function totalScore(codeSeries, scores) {
    // look up the value for the coded score in the scores data.
    // then sum using a simple reduce.
    var total = codeSeries.map((item, index) =>
                               scores[index][item - 1]).reduce((a, b) => a + b);

    return (total)
  }


 return (
   <>
     <div>
       <p>These are your results.</p>
       <p>A: {aScore} </p>
       <p>C: {cScore} </p>
       <p>I: {iScore} </p>
     </div>
     <button type="button" onClick = {() => props.moveCursor(-1)}>Back</button>
   </>
 )

}
