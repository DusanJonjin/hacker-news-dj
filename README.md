# Hacker news clone reader app 
This is the second time I've made this app, because I realized that it was a little bit slow (especially when loading the large number of comments), and the information (stories or news) density on mobile devices view was too low - you could see only two stories on the display shown at the same time, and you needed to scroll or slide a lot to get to the last story.

So, because of the aforementioned reasons, I've decided to refactor my previous code (which is also available as a repository on my profile), and make the app run faster and add another view (theme), which is similar to the original classic **Hacker News** view, with more information density.

I'm still using the official [Hacker news API](https://github.com/HackerNews/API) to get the data (stories, comments, replies...) for the app.

**The technologies that I'm using are: React with Javascript, React Router for managing the app routing, Redux for partial state managment, and vanilla CSS for styling the app.**

## Speeding up the app
To solve the first problem - speeding up or boosting the performance of the App, I had to change the approach of making API calls and storing and reading the response data.

The problem was that I've structured my API calls so that the async function (which is used to get the data), was called from inside main component's useEffect hook, and it was making API calls for all of the items (for the comments I had to do the recursion of the function to get all of the comments and their replies), got responses with data, and then when it's all finished they are saved in this main component's state from where they were passed down to the child components which read and displayed the data.

This was not so big of a problem for the Stories (news) page, because this component had to make twenty or thirty API calls, and the responses with data came fairly quickly. The problem was very obvious on the StoryComments component (page) when a story had a large number of comments (over 100). The larger the number, the loading of comments was progressively slower, because the function had to make a large number of API calls and wait for their responses so they could be saved in the main components state.

The solution that I've implemented is that I'm using the async function in the main component's useEffect hook to get the array of stories ID's, store them in this components state, and passing them down to child components via props. The array is getting mapped in the first child (list) component and every single ID was passed down to their respected Story component. This Story component uses useEffect hook to call another async function which gets the data for the individual item (story) which is stored in components state and displayed on the UI.
This way we don't have to wait for all of the stories to be loaded, because every single Story component (which is lower in the App tree) has it's own individual state, and the Story's data is displayed when it's loaded (stored) in every component individually. 

For the StoryComments component the same logic is being implemented, except that I had to do recursion of the StoryComment component to get the replies (if the replies existed). The Json response you get for every comment is structured like so that you get only the first level of ids (kids) for individual comment's replies, so you need to recursevly traverse all the way down the tree to get all of the replies (or comments below, reffering to the main comment).

For the Comments page I've changed the logic too. Instead of very complicated logic and huge async function that I've used to get the comments from top 20 stories which then get sorted by time, I used maxItem to get the last item ID (story or comment with the highest ID) that is being published on HN. Using this ID, I can make an array of 20 last items that have been published. This array gets passed down via props to the child component, which then makes a list of comments, and each comment gets it's ID via props. Similary to Stories component above, every Comment component makes an API call through async function in its useEffect hook, stores the responded data in its state and displays it on the UI. To display the story's name on which the comment is reffering, I had to do the recursion in the RefferedStory component and traverse the tree all the way up until it gets to the wanted story.

## Partial redesign or adding the new UI view
I decided to add a new UI view (or theme) because I realized that it wasn't so user friendly on mobile view with the original Modern theme. So I added the new UI theme (classic) which is very similar (but a bit more colorful) to the original minimalistic Hacker News UI, which is very dense in information. It was a lot of work with CSS for adding this theme, because I literaly had to go backwards and rewrite a lot of lines from complex to more simple UI. 

As I wanted to implement Dark theme to both views (Ui's) the function that I wrote for class naming (themedClass) helped me a lot not to lose orientation when writing class names. I added a few more skeleton (or placeholder) components so that the app had a smoother transition while changing the routes. The vanilla CSS is used throughout the whole app.




