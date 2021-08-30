# Hacker news clone reader app 
---
This is the second time I've made this app, because I realized that it was a little bit slow (especially the loading of large number of comments was going very slow), and the information (stories or news) density on mobile view was too low - because you could see only two stories on the display shown at the same time, and you needed to scroll or slide a lot to get to the last story.

So, because of the aforementioned reasons, I've decided to refactor my previous code (which is also available as a repository on my profile), and make the app run faster and add another view (theme), which is similar to the original classic **Hacker News** view, with more information density.

I'm still using the official [Hacker news API](https://github.com/HackerNews/API) to get the data (stories, comments, replies...) for the app.

## Speeding up the app
---
To solve the first problem - speeding up or boosting the performance of the App, I had to change the approach of making API calls and storing and reading the response data.
The problem was that I've structured my API calls so that the async functions (which is used to get the data), was called from inside main component's useEffect hook, and it was making API calls for all of the items (for the comments I had to do the recursion of the function to get all of the comments and their replies), got responses with data, and then when it's all finished they are saved in this main component's state from where they were passed down to the child components which read and displayed the data.
This was not so big of a problem for the stories (news) page, because this component had to make twenty or thirty API calls, and the responses with data came fairly quickly. The problem was very obvious when story had a large number of comments (over 100). The larger the number, the loading of comments was progressively slower, because the function had to make a large number of API calls and wait for their responses so they could be saved in the main components state.



