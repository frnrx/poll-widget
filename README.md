This is a poll widget built in React that can be easily embeded in any HTML file.

## To run the app
```
yarn
yarn start
```

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

For this project, the focus on the implementation of the features was keeping it as simple as possible by using only React ready features. For this, the tools used were ReactJS, vanilla CSS, react-testing-library and localStorage.

For improvements, it would be nice to add a Javascript-CSS library (styled-components, emotion, etc) to avoid doing inline-style logics and to keep the styles more readable. It would also be good to test more cases of the localStorage management through the functions `handleVote` and `setNewPollData` and test the CSS changes that happen through user interactions.
