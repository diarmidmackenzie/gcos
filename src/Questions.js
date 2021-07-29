
// questions = data for questions.
// cursor = index of situation to show
// scores = data recording scores
// setScore = callback to set a score
// moveCursor = callback to move the cursor

export function GcosIntro(props) {

  return (
    <>
      <p> This page provides a self-assessment of your General Causality Orientation.</p>
      <p> To Begin the Survey Press the Start button </p>
      <button type="button"
              onClick = {() => props.moveCursor(1)}>Start</button>
      <p> All processing of the answers you provide is exclusively within your browser.  This site does not collect any data from you.</p>
      <p> For background about Causality Orientations and the GCOS scale, see <a href="https://github.com/diarmidmackenzie/gcos/blob/main/README.md#gcos-survey">the project README file in GitHub</a></p>
    </>
  )
}

export function GcosQuestions(props) {

  //var nextActive = props.scores[props.cursor].every((e) => e > 0);
  var nextActive = ((props.scores[props.cursor][0] > 0 ) &&
                    (props.scores[props.cursor][1] > 0 ) &&
                    (props.scores[props.cursor][2] > 0 ))

  var nextText = (props.cursor === (props.questions.length - 1)) ?
                 "Finish" : "Next"

  return (
    <>
      <Situation
        index = {props.cursor}
        question = {props.questions[props.cursor].question}
        questions = {props.questions}
        scoreGroup = {props.scores[props.cursor]}
        setScore = {props.setScore}/>
      <button type="button"
              onClick = {() => props.moveCursor(-1)}>Prev</button>
      <button type="button"
              onClick = {() => props.moveCursor(1)}
              disabled = {nextActive ? null : true}>{nextText}</button>
    </>
  )
};

// index = question index
// questions = data for questions.
// question = text of question
// scoreGroup = group of 3 scores
// setScore = callback to set a score
function Situation(props) {

  return (
    <>
      <div>
        <p className="number">{(props.index + 1) + "/" + props.questions.length + " "} </p>
        <p className="question">{props.question}</p>
        <br/>
      </div>
      <div>
        {props.scoreGroup.map((score, index) => (
            <Response
              key = {"Q" + props.index + "-" + Number(index)}
              groupIndex = {props.index}
              index = {index}
              responseText = {props.questions[props.index].responses[index]}
              score = {score}
              setScore = {props.setScore}
              selectedValue = {props.scoreGroup[index]}/>
          ))}
      </div>
    </>
  )
}

// groupIndex = index of question group
// index = index of response within this group
// responseText = text of this response
// setScore = callback to set a score
// selectedValue = which value (if any) is checked.
function Response(props) {

  const prepends = ["a) ", "b) ", "c) "];

  return (
    <>
      <div className = "response">
        {prepends[props.index] + props.responseText}
      </div>
      <div className = "radio-group">
      {
        Array.from(Array(7).keys()).map((item) => (
          <Option
            key = {item + 1}
            groupIndex = {props.groupIndex}
            index = {props.index}
            value = {item + 1}
            defaultChecked = {props.selectedValue === (item + 1)}
            setScore = {props.setScore}
          />
        ))
      }
      </div>
      <div className = "radio-key">
        very unlikely
      </div>
      <div className = "radio-key">
        moderately likely
      </div>
      <div className = "radio-key">
        very likely
      </div>
    </>
  )
}

// groupIndex = index of question group
// index = index of response within this group
// value = value to choose
// setScore = callback to set a score
// defaultChecked = whether or not this option is checked (true/false)
function Option(props) {

  return(
    <>
      <label htmlFor={props.value}>
        <input type = "radio"
               name = {props.groupIndex + "-" + props.index}
               value = {props.value}
               defaultChecked = {props.defaultChecked ? "checked" : null}
               onClick = {() => props.setScore(props.groupIndex, props.index, props.value)}/>
        {props.value}
      </label>
    </>
  )
}
