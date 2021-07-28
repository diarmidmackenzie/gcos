
// questions = data for questions.
// cursor = index of situation to show
// scores = data recording scores
// setScore = callback to set a score
// moveCursor = callback to move the cursor

export function GcosIntro(props) {

  return (
    <>
      <p> To Begin the Survey Press the Start button </p>
      <button type="button"
              onClick = {() => props.moveCursor(1)}>Start</button>
    </>
  )
}

export function GcosQuestions(props) {

  //var nextActive = props.scores[props.cursor].every((e) => e > 0);
  var nextActive = ((props.scores[props.cursor][0] > 0 ) &&
                    (props.scores[props.cursor][1] > 0 ) &&
                    (props.scores[props.cursor][2] > 0 ))
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
              disabled = {nextActive ? null : true}>Next</button>
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
        {props.question}
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
  return (
    <>
      <div>
        {props.responseText}
      </div>
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
      <input type = "radio"
             name = {props.groupIndex + "-" + props.index}
             value = {props.value}
             defaultChecked = {props.defaultChecked ? "checked" : null}
             onClick = {() => props.setScore(props.groupIndex, props.index, props.value)}/>
      <label htmlFor={props.value}>{props.value}</label>
    </>

  )
}
