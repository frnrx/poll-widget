This is a simple Poll built in React that allows a user to vote one time per refresh and stores the votes in localStorage.

## To run the app

`yarn`
`yarn start`

## To run the tests

`yarn test`

## To implement the Poll on a HTML file

Add this 3 tags in your HTML file.
_Attention_: The answers should be divided by the separator `|`, with no space in between.

```
<link href="https://frnrx.github.io/poll-widget/index.css" rel="stylesheet" />
<script src="https://frnrx.github.io/poll-widget/index.js"></script>
<div class="poll_widget" data-question="QUESTION" data-answer-options="ANSWER1|ANSWER2|ANSWER3"></div>
```

## Technical summary

For this project I decided focus on the implementation of the features keeping it as simple as possible by using only React ready features. For this, I used ReactJS, vanilla CSS and react-testing-library. I considered using `react'leaf-polls` as the foundation for the poll, but I figured I could build all the features myself for the sake of the assessment.

For improvements, I would add a Javascript-CSS library (styled-components, emotion, etc) to avoid doing inline-style logic and keep the styles more readable. I would also test more cases of the localStorage management through the functions `handleVote` and `setNewPollData` and test the CSS changes that happen through user interactions.
