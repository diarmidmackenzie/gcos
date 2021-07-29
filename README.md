# GCOS Survey

### Overview

This tool offers an assessment of your General Causality Orientation, using [Deci & Ryan's General Causality Orientation Scale (GCOS) (1985).](https://selfdeterminationtheory.org/SDT/documents/1985_DeciRyan_GCOS.pdf)

It provides you with scores representing your orientation on three different scales of Causality Orientation:

- Autonomous
- Controlled
- Impersonal

A PDF version of the survey can be downloaded from [here](https://selfdeterminationtheory.org/general-causality-orientations-scale/) (after registration).

This tool uses the 51 question version of the survey (GCOS-17).  The PDF also includes a 36 question survey (GCOS-12).

At the end of the survey, this tool shows your results in three forms:

- As normalized scores, where the mean score is 100, and each Standard Deviation from the mean is +/-15 points.
- As percentile scores
- As a single color, representing the 3-dimensional GCOS score, with green for autonomy, red for controlled and blue for impersonal.

These scores are computed using:

- The "coding" of responses into the Autonomous, Controlled & Impersonal scales.
- Data about the general population distribution of GCOS scores (taken from [Deci & Ryan's 1985 GCOS paper](https://selfdeterminationtheory.org/SDT/documents/1985_DeciRyan_GCOS.pdf))

See "detailed notes" below for some of the specifics.

The tool does not display the raw scores for each scale, because they are not directly meaningful or comparable (e.g. the average score for Autonomy is much higher than the average score for Controlled or Impersonal).

### Data Privacy

All processing of the answers you provide is exclusively within your browser.  This site does not collect any data from you.

### What do my GCOS Scores Mean?

A person's General Causality Orientation influences their likelihood of interpreting interactions as autonomy-supporting, controlling, or amotivating, which in turn predicts a wide range of other outcomes.

Each of these is influenced by the respective scale (Autonomy, Controlled or Impersonal) on the GCOS.

Causality Orientation Theory (COT) is part of Self-Determination Theory, a contemporary theory in empirical psychology.

COT predicts that a person's General Causality Orientation has a significant impact on several important aspects of their life.  In particular:

- A high autonomy orientation is strongly associated with the healthiest development and best overall psychological well-being.
- A high controlled orientation is often associated with success, but this success often comes at a cost in terms of psychological well-being.
- A high impersonal orientation is associated with a lack of motivation, and the lowest well-being.

You can find (much) more detail on Causality Orientation Theory this [in this article](https://diarmidmackenzie.github.io/sdt-condensed/COT.html).

### Detailed Notes

The data on GCOS distribution in the population comes from this data in [Deci & Ryan's 1985 paper](https://selfdeterminationtheory.org/SDT/documents/1985_DeciRyan_GCOS.pdf).

![image-20210729132332856](GCOS-Distribution.png)

This data comes from a sample of 636 undergraduate students, so may not be representative of the overall population.

The tool uses the combined data.  Showing different scores for men & women is a potential future enhancement.

The data was collected from GCOS-12, with 36 questions.  Therefore to compare with this data, the scores from GCOS-17 are scaled by a factor of 12/17.

The calculations do not model skew or curtosis.  They just compute the number of standard deviations that a score lies from the mean, and then compute percentiles assuming a normal distribution.

The "normalized" scores presented follow the same model as IQ scores: 100 points is the average, and a standard deviation is represented by 15 points, so a score of 130 is 2 standard deviations above the mean.

The 3-dimensional GCOS score is also translated into a single color, with red representing the controlled orientation, green representing the autonomy orientation, and blue representing the impersonal orientation.

For this color mapping, the values 40 to 160 on the normalized scale are mapped linearly to RGB values from 0 to 255.

### Source Code

The source code for this tool is available under the MIT license.

https://github.com/diarmidmackenzie/gcos

