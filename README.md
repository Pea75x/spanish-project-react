# Spanish Project frontend

## Technologies used

- React 18.2
- Axios
- Jest
- Tailwind CSS
- Redux
- Deployed with netlify

## Netlify link -

https://spanish-project.netlify.app

To log in as an admin -

```
Username: admin1
Password: qweqweqwe
```

## Game Component

I have created a reusable game component, used for each type of game. It takes the games theme (in this case past tense) and makes a request for a random selection of 15 sentences with that theme. It then displays the english translation for you to translate to spanish

<img src="./game.png" alt='game' width="600" />

### List of words

Includes a list of categories and an input box to narrow down your search. When you click on the page it will take you to a page like the verb page below

<img src="./words.png" alt='words-page' width="600" />

### Verb page

Shows you how to use the verb with different tenses and pronouns, includes an example sentence at the bottom

<img src="./verbs.png" alt='verb-page' width="600" />
