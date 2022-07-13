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
```
<link href="https://frnrx.github.io/poll-widget/index.css" rel="stylesheet" />
<script src="https://frnrx.github.io/poll-widget/index.js"></script>
<div class="poll_widget" data-question1="QUESTION" data-answer-options1="ANSWER1|ANSWER2|ANSWER3"></div>
```
_Attention_: The answers should be divided by the separator `|`, with no space in between.

There can be only one widget per page. The widget can have multiple questions:
```
<div class="poll_widget" data-question1="QUESTION" data-answer-options1="ANSWER1|ANSWER2|ANSWER3" data-question2="QUESTION 2" data-answer-options2="ANSWER1|ANSWER2|ANSWER3"></div>
```
_Attention_: Every `data-question1` must have a `data-answer-options1` with the respective number. Every new question and answers must be in ascending order, with no numbers omitted.



## Technical summary

For this project, the focus on the implementation of the features was keeping it as simple as possible by using only React ready features. For this, the tools used were ReactJS, vanilla CSS, react-testing-library and localStorage.

For improvements, it would be nice to add a Javascript-CSS library (styled-components, emotion, etc) to avoid doing inline-style logics and to keep the styles more readable. 
It would also be good to test more cases of the localStorage management through the functions `handleVote` and `setNewPollData` and test the CSS changes that happen through user interactions.
Finally, it would be nice to have error feedback in case the implementation is wrong.
