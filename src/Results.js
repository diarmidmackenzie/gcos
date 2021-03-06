

// coding = data on mapping from responses to A/C/I
// distirbution = data about distribution of scores in general population
// scores = scores data
// moveCursor = callback to move cursor
// resetSurvey = callback to reset Survey and return to main screen/>
export function GcosResults(props) {

  // combine coding series + scores to get a total score for
  // A, I or C.
  function totalScore(codeSeries, scores) {
    // look up the value for the coded score in the scores data.
    // then sum using a simple reduce.
    var total = codeSeries.map((item, index) =>
                               scores[index][item - 1]).reduce((a, b) => a + b);

    return (total)
  }

  function getSds(distribution, value) {

    // scale value by 12/17 (distribution data is from 12 question survey)
    const scaledValue = (value * 12) / 17;
    console.log(`Scaled value: ${scaledValue}`)
    const diff = scaledValue - distribution.mean;
    console.log(`Diff: ${diff}`)
    var sds = diff / distribution.sd;
    console.log(`SDs: ${sds}`)

    // Cap SDs at 4.
    if (sds > 4) {
      sds = 4;
    }
    if (sds < -4) {
      sds = -4;
    }

    return (sds);
  }


  function normalized(distribution, value) {

    const sds = getSds(distribution, value)

    // each SD maps to 15 percentage points in this scale
    // ( 40 = -4 SDs, 160 = +4 SDs);
    const normalizedValue = 100 + (sds * 15)
    console.log(`Normalized: ${normalizedValue}`)

    return (normalizedValue);
  }

  function percentile(distribution, value) {

    const sds = getSds(distribution, value)
    console.log(`SDs: ${sds}`)

    const percentileScore = GetZPercent(sds)
    console.log(`Percentile: ${percentileScore}`)

    return (percentileScore)
  }

  // Borrowed from stack overflow:
  // https://stackoverflow.com/questions/16194730/seeking-a-statistical-javascript-function-to-return-p-value-from-a-z-score
  function GetZPercent(z)
  {
    //z == number of standard deviations from the mean

    //if z is greater than 6.5 standard deviations from the mean
    //the number of significant digits will be outside of a reasonable
    //range
    if ( z < -6.5)
      return 0.0;
    if( z > 6.5)
      return 1.0;

    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);
    while(Math.abs(term) > loopStop)
    {
      term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
      sum += term;
      k++;
      factK *= k;

    }
    sum += 0.5;

    return sum;
  }

  // displaying percentiles is a subtle art.
  // we don't want arbitrary accuracy.
  // but for values like 99.999, we do want several significant figures
  // This function provides that.
  // percentile input is as a decimal (0 to 1).
  // output is a percentile string, e.g. "99.99th percentile"
  function displayPercentile(percentile) {
    // implementation - series of cut-offs
    // with a different precision for each cut-off.
    var string = ""

    percentile = percentile * 100

    if (percentile <= 0.1) {
      string = percentile.toPrecision(1);
    }
    else if (percentile <= 99) {
      string = percentile.toPrecision(2);
    }
    else if (percentile <= 99.9) {
      string = percentile.toPrecision(3);
    }
    else if (percentile <= 99.99) {
      string = percentile.toPrecision(4);
    }
    else if (percentile <= 99.999) {
      string = percentile.toPrecision(5);
    }
    else {
      // Just declare as 100th percentile.
      string = percentile.toPrecision(1);
    }

    return (string)
  }

  // Get a text description from a percentile
  function percentileDescription(percentile) {
    // implementation - series of cut-offs
    // with a different description for each cut-off.
    var string = ""

    percentile = percentile * 100

    if (percentile <= 1) {
      string = "exceptionally low"
    }
    else if (percentile <= 10) {
      string = "very low"
    }
    else if (percentile <= 30) {
      string = "low"
    }
    else if (percentile <= 70) {
      string = "normal"
    }
    else if (percentile <= 90) {
      string = "high"
    }
    else if (percentile <= 99) {
      string = "very high"
    }
    else {
      string = "exceptionally high"
    }

    return (string)
  }

  // Take normalized A, C & I scores and generate a style string for
  // a block of color.
  function gcosColorStyle(A, C, I) {

    var style = {};

    // Control = red, Autonomy = green, Impersonal = blue
    // normalized scores are on a scale of 40 to 160.  Need to map to a scale
    // of 0 to 255.
    function scoreToRGB(score) {
      return Math.floor((score - 40) * 255 / 120).toString(16).padStart(2,'0');
    }

    const r = scoreToRGB(C);
    const g = scoreToRGB(A);
    const b = scoreToRGB(I);

    style['backgroundColor'] = "#" + r + g + b;

    if ((Number("0x" + r) +
         Number("0x" + g) +
         Number("0x" + b)) > 400) {

       style['color'] = "black"
    }
    else
    {
       style['color'] = "white"
    }

    return (style)
  }

  // calculate scores for A, I and C.
  var aScore = totalScore(props.coding.A,
                          props.scores);
  var cScore = totalScore(props.coding.C,
                          props.scores);
  var iScore = totalScore(props.coding.I,
                          props.scores);

  var aPercentile = percentile(props.distribution.all.A,
                               aScore);
  var cPercentile = percentile(props.distribution.all.C,
                               cScore);
  var iPercentile = percentile(props.distribution.all.I,
                               iScore);

  var aNormalized = normalized(props.distribution.all.A,
                               aScore);
  var cNormalized = normalized(props.distribution.all.C,
                               cScore);
  var iNormalized = normalized(props.distribution.all.I,
                               iScore);

 return (
   <>
     <div>
       <p>These are your normalized results on each orientation.</p>
       <div className = "color-block"
          style = {gcosColorStyle(aNormalized, cNormalized, iNormalized)}>
          <div className = "norm-scores">
             <p>Autonomy: {aNormalized.toFixed(0)} ({percentileDescription(aPercentile)})</p>
             <p>Controlled: {cNormalized.toFixed(0)} ({percentileDescription(cPercentile)})</p>
             <p>Impersonal: {iNormalized.toFixed(0)} ({percentileDescription(iPercentile)})</p>
           </div>
         </div>
       <p>(mean = 100, 1 S.D. = 15 points)</p>
       <p>These are your results as percentiles.</p>
       <div className = "color-block"
          style = {gcosColorStyle(aNormalized, cNormalized, iNormalized)}>
          <div className = "percentile-scores">
             <p>Autonomy: {displayPercentile(aPercentile)}th ({percentileDescription(aPercentile)})</p>
             <p>Controlled: {displayPercentile(cPercentile)}th ({percentileDescription(cPercentile)})</p>
             <p>Impersonal: {displayPercentile(iPercentile)}th ({percentileDescription(iPercentile)})</p>
           </div>
        </div>
        <p>The background color used above represents your overall control orientation.</p>
        <p><span className = "green"> Autonomy </span>
           <span className = "red"> Controlled </span>
           <span className = "blue"> Impersonal </span>
         </p>
         <p> For information about how to understand these results, see <a href="https://github.com/diarmidmackenzie/gcos/blob/main/README.md#what-do-my-gcos-scores-mean">the notes here</a>.</p>
     </div>
     <br/>
     <button type="button" onClick = {() => props.moveCursor(-1)}>Back</button>
     <button type="button" onClick = {() => props.resetSurvey()}>Restart</button>
   </>
 )

}
