# AI_LOG

## AI_LOG Statement

During this assignment I have used AI tools as a supportive resource throughout the development process. Mainly these tools were used for debugging asisstance, helping me reason through issues and better understand errors or unexpected behaviour in my code.

When researching different methods and approaches I've used AI as a way to help clarify and explore. In situations were I found some parts of the assignment difficult to understand, AI tools helped me break down and interpret the material more clearly.

All code included in this project was written entirely by me. AI tools were not used to generate code but rather to support my understanding and problem solving process.

## Log 2/11-26 - 15/11-26

### 2/11-26

- Used Gemini to structure the course assignment instructions, submission and grading criteria to make a step by step plan to get a more clear overview of the project. I've not used the plan but it gave me more thoughts and reflections on how I wanted to develop the assignment.
- Used ChatGPT to help with debugging when getting "Bad Request" when registering an account and logging in. Turned out I was storing the label values instead of the input values. I also found out when debugging that I had used an maxLength property on the email input which made creating an email adress difficult.

### 5/11-26

- Used ChatGPT to help understand error messages logging in the console when using the search input. I learned that this happens because some of the URLs are broken or too old, and not in use anymore. The solution was to create an onError when displaying images on the posts. This worked somewhat, but I still get some error messages logged when searching.

### 10/11-26

- Used ChatGPT to help understand why my updateForm() in single post page would not refresh and submit properly. The issue was that I had forgotten to fetch the loader in the DOM.
- Asked ChatGPT to help understand more about helper functions or reusable functions. Asked to be shown examples in real life projects.

### 11/11-26

- Used ChatGPT to help understand why the status message would not show when a post was edited (Example: "Post updated! Refreshing..."). Found out I had two IDs with status in the same HTML document. Solution was to change to class, and to fetch the status from each form. This worked.

### 12/11-26

- Used ChatGPT to help understand why my moreBtn would not show up on the profile of the logged in user. I got some advice to add another argument for my showProfilePosts and then compare the profileName with loggedInUser.
- Used ChatGPT to help me with the follow/unfollow button logic. Found it hard to understand how to display unfollow when you have followed a profile. Right now when the page is refreshed the follow button shows, when it should have changed to an ufollow button. ChatGPT explained the concept of using a boolean state variable, like the variable isFollowing.

### 13/11-26

- Continueing on the Follow/Unfollow button I asked ChatGPT to give me some suggestions on how I could fix the button. One suggestion was to create a function that checks if the user is following or not. I will try to implement this now.

### 14/11-26

- Asked ChatGPT for general best practices on DRY (Dont Repeat Yourself). Got some tips that I have tried to implement.
- Asked ChatGPT to help me understand why my search input suddenly did not work during testing. Turned out there was some debugging to be done to authorLink; the code now works so that if author does not exist the link should be "#". This makes it so that when searching the owner of the post does not show, but the title link is still clickable. Will try to fix this if I have the time.
- Asked Gemini to go over some of my JSDoc annotations, and asked if my code was understandable and readable.
