
// questions = data for questions.
// scores = data recording scores
// setScore = callback to set a score

export function GcosQuestions(props) {

  return (
    <>
      {props.scores.map((scoreGroup, index) => (
          <Situation
            key = {"Q" + Number(index)}
            index = {index}
            question = {props.questions[index].question}
            questions = {props.questions}
            scoreGroup = {scoreGroup}
            setScore = {() => props.setScore}/>
        ))}
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
              setScore = {props.setScore}/>
          ))}
      </div>
    </>
  )
}

// groupIndex = index of question group
// index = index of response within this group
// responseText = text of this response
// setScore = callback to set a score
function Response(props) {
  return (
    <>
      <div>
        {props.responseText}
      </div>
      {
        Array.from(Array(7).keys()).map((item) => (
          <Option
            groupIndex = {props.groupIndex}
            index = {props.index}
            value = {item + 1}
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
function Option(props) {

  return(
    <>
      <input type = "radio"
             name = {props.groupIndex + "-" + props.index}
             value = {props.value}
             onClick = {props.setScore(props.groupIndex,
                                       props.index,
                                       props.value)}/>
      <label for={props.value}>{props.value}</label>
    </>

  )
}
