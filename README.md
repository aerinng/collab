# Collab :relaxed:

### Orbital 2020 - Apollo 11

### Authors
Ng Shi Xuan, Aerin & Alyssa Nah Xiao Ting

### Team Name
AA Battery

## Table of Contents
### What is Collab
- [App Description](https://github.com/aerinng/collab#app-description)
### Inspiration behind Collab
- [Problem Research](https://github.com/aerinng/collab#problem-research)
- [Motivation](https://github.com/aerinng/collab#motivation)
- [Aim](https://github.com/aerinng/collab#aim)
- [User Stories](https://github.com/aerinng/collab#user-stories)
### About Collab
- [App Features](https://github.com/aerinng/collab#app-features)
- [Program Flow](https://github.com/aerinng/collab#program-flow)
- [How Collab Works](https://github.com/aerinng/collab#how-collab-works)
- [Tech Stack](https://github.com/aerinng/collab#tech-stack)
- [What Makes Collab Unique](https://github.com/aerinng/collab#what-makes-collab-unique)
### Development of Collab
- [Project Logs](https://github.com/aerinng/collab#project-logs)
- [User Guide](https://github.com/aerinng/collab#user-guide)
- [Developer Guide](https://github.com/aerinng/collab#developer-guide)
- [Development Plan](https://github.com/aerinng/collab#development-plan)
- [System Testing Log](https://github.com/aerinng/collab#system-testing-log)
- [Usability Testing](https://github.com/aerinng/collab#usability-testing)
- [Security Features](https://github.com/aerinng/collab#security-features)
- [Challenges Encountered](https://github.com/aerinng/collab#challenges-encountered)
- [Possible Enhancements for Milestone 3](https://github.com/aerinng/collab#possible-enhancements-for-milestone-3)

## App Description

Collab is an application serving as a communication platform to facilitate buyers to collaborate and collate items for a bigger order to achieve higher savings. Collab allows users to list the orders they will be making in order to find other buyers to combine orders with. 

Collab is not an e-commerce platform. Collab will not be responsible for any payment to be made between buyers or orders to be made in external stores and is simply a platform to reach out to potential collaborators. There is also no platform fee incurred to list an offer on Collab.

To preview Collab, iOS will be the most ideal to preview Collab as we mainly designed Collab for iOS devices. However, due to security measures by the Expo team, other users are unable to preview the app on iOS without prior authentication from the project owner. Tentatively, previewing it with Android will not have all the elements aligned to the page properly, although it still works on Android as well. This will be improved by the next submission.  

You may preview Collab by following the [User Guide](https://github.com/aerinng/collab#user-guide).

Find out more about Collab in this [video](https://drive.google.com/file/d/1yEoX7UF2L5jVTuDJbfPLYAWwAbgQAKR7/view?usp=sharing)!

<p align="center">
   <img src="https://i.imgur.com/V5yb6Li.png" width="600">
</p>

## Problem Research
### Why React Native
We chose to develop our Application using a Hybrid App Framework, React Native, as it is simpler to develop and test compared to Native App Frameworks. It is also easier to update and make changes which can free up some of our time to focus on other aspects of our application.

### Why Expo CLI
For React Native, we chose Expo CLI for our development environment instead of React Native CLI as it is more convenient and simple for us with no mobile development experience to begin with. Expo also has a client app on iOS and Android phones to allow us to view how our application looks like on an actual phone, which will allow us to better design our app.

### Why Collab
The idea of our application came about as both of us are avid online shoppers and would frequently meet the problem of not purchasing enough to meet the minimum required amount for free delivery. After some research, we found out that there are websites or applications that compares prices among different stores but none allows users to gather people to join orders with. Hence, the idea of Collab came about. Collab will not help users place their orders, but simply provide a simple platform for users to communicate and gather other users to combine orders with. This helps to amount to larger purchases. 

While deciding the features and functions of Collab, we were inspired by applications such as Carousell, Instagram and Grab. So we did an environmental scan for these three applications and from there, we gathered the best features and functions that we believe Collab will need. 

One feature adapted from our research would be choosing Bottom Tabs Navigator over Drawer Navigator. Many applications use Bottom Tabs Navigator for navigation. As the interface of our phones is relatively small compared to a laptop, using Drawer Navigator would not allow users to view the screen content while choosing the tabs. Hence, Bottom Tabs Navigator was a better choice for us as it gives users a view of all the functions of our application at one glance, while allowing them to view the content of the screen.

Another feature would be our Groups Function. In Grab, food items are categorised by cuisines type, location proximity or recommendations based on user's orders. In Instagram, the Explore page are categorised by the types of posts an account frequently uploads or recommendations based on user's content preferences. In Carousell, users can upload their products and discussions to groups of different categories. These three applications have a common feature to group items by category, in order for users to find items they prefer easier and filter out other items which they may not want to view. Hence, this greatly inspired us to include our Groups Function.

## Motivation
 
For students who are staying on campus, buying groceries or online shop orders may be more costly as items are usually purchased in one or a few units. We may not always be able to find people to combine orders with to enjoy benefits like free delivery and discounts.

How convenient would it be to have a platform to consolidate orders from other interested users near you to receive bigger savings on your order? Perhaps you do not want to fork-up more money for delivery, just because you did not hit the ‘minimum amount purchased’. You will not only reduce the inconvenience of needing to find friends to bulk order with, but you can also be certain to enjoy savings during your purchase that some stores offer.

## Aim
 
We want shoppers to be able to communicate with other buyers in their neighbourhood easily to consolidate orders in order to attain significant savings, such as free delivery and discounts, on their purchase.

## User Stories

1) When I make purchases, I want to be able to receive free delivery and discounts. However, I may not have enough items in my cart to be eligible for free shipping. 
2) When my package delivery arrives and I am not around, I need someone to collect it on my behalf. Having a platform to communicate with other buyers would be helpful.
3) I want to enjoy the luxury of shopping online and not having to go to a physical store or pay delivery fees for my online order. 
4) I want to enjoy savings from purchases I make regularly without needing to go through the physical trouble of gathering people to reach the minimum purchase amount.

## App Features
We will be developing an application for iOS that contains these features. 
1. Auto-Post of Requests
   - Allows users to automate the request of posting their offer on Collab at a frequency set by the main buyers
   - Reduces the physical inconvenience required for main buyers to add an offer repetitively, which may occur at a frequent rate (e.g. daily, weekly)
   - This automated request for a particular promotion will only be valid if the promotion is still ongoing
2. Auto-Retrieval of Data from Websites 
   - Displays discounts from selected stores which will be retrieved from Collab's database
   - Links user to external stores promotions websites for easy reference
3. Messaging Function
   - Facilitates communication with other buyers
4. Groups Function
   - Stores are categorised into Groups by the type of products the store sells (e.g. groceries, make up)
   - Users can join Groups to receive notifications of any offers posted by other buyers for the particular categories
5. Notifications Function
   - Allow main buyers to be notified when other buyers are interested in combining orders with them.
   - Allow sub-buyers to be notified when the main buyer accepts their request to combine the order.
  
## Program Flow
The diagram below depicts the brief overview of Collab’s workflow. 
<p align="center">
   <img src="https://i.imgur.com/qZNeHIC.png" width="600">
</p>

## How Collab Works
<p align="center">
   <img src="https://i.imgur.com/F0Xs9tm.png" width="600">
</p>

When the user first opens the application, they will have to create an account before being able to login as part of authentication. 

By clicking on the ‘Sign Up’ button, they will be redirected to the ‘Register’ page. 

Upon successful login using user's email and password, they are brought to the main menu. The landing page will be the ‘Search’ page. There are a total of 5 tabs which the user can click on to use their features. Namely, the pages are: Search, Group, (Add) Offer, Chat, and Profile. 

Search page allows users to search for any offers that are listed on Collab. Users can thereafter choose to join the offer listed, if they intend to buy items from the same store too.

Group page allows users to join groups which contains offers categorised by the type of products the store they included in their offer listing sells. Users will also receive notifications for any offer listings posted in the groups they joined.

(Add) Offer will lead the user to a screen displaying a list of store promotions. Thereafter, the user will fill in a form before successfully posting their offer to Collab. The necessary details are keyed in by the user, after which they will ‘Post’ and have the details saved. 

Chat page allows users to communicate with other users that are registered on Collab.

Profile page allows users to edit their particulars, edit their auto-post frequency and notifications settings as well as view the offers that they have created or joined.

Have a look at our [Prototype](https://www.figma.com/proto/K21NBhfN3Yd1pUdjtItRIB/Collab?node-id=18%3A0&scaling=scale-down)! Actual UI/UX of our application may differ from this prototype.

## Tech Stack
1) IDE: VS Code
2) Code: React Native, Javascript
3) Database: FireBase
4) Analytics: Google Analytics
5) Environment: Expo CLI

## What Makes Collab Unique
Features | Collab | DiffMart | iPrice
------------ | -------------| ------------ | -------------
Platform | Application | Website | Website
Aim | Provide a platform for easy communication among buyers to combine orders | Compare prices of products among different stores| Provides exclusive promotions, price comparison among different stores
Price Comparison between products | No | Yes | Yes 
Show promotions | Yes | Yes | Yes
Messaging platform | Yes | No | No
Notifies other buyers for possible purchase collaboration | Yes | No | No
Range of items showcased | Tentatively, local major stores in Singapore | Groceries (major Singapore supermarkets) | Retail, Electronics, Automotive etc.
Watchlist to keep track of favourite item’s promotion | No | Yes | No
Additional Features | ‘Groups’ page which users can join communities who have bought similar items | Calculate how much savings you will accumulate during a promotion | ‘Coupons’ page with promotional codes and coupons (stores include FoodPanda, Zalora etc)

## Project Logs
1) [Milestone 1](https://drive.google.com/file/d/1fzQ8Rud7MHVu-OflHw9KMOSbr1W-3Z2g/view?usp=sharing): Creation of Prototype
2) [Milestone 2](https://drive.google.com/file/d/1ItrYT3N14vkSin8SKVW9UIx_DrfPU0zP/view?usp=sharing): Creation of MVP
3) Milestone 3 (Coming to you on 27 July!): Final Product

## User Guide
The User Guide for Collab can be found [here](https://drive.google.com/file/d/1HVJU8znPSzS2bPH1cGGUivyuvAArADD6/view?usp=sharing).

## Developer Guide
The Developer Guide for Collab will be coming to you on 27 July!

## Development Plan
Target | Actions to reach target | Target Date (Tentative) | Status
-------| ------------------------| ------------------------|--------
Notification Pop-ups | Understand how to use API calls to send notifications to users | Mid June (17th June) | :white_check_mark:
Auto-Retrieval of Data from Websites Function | Reach out to relevant stores to request utilizing their APIs. Understand how APIs work (to request, passing the authentication etc). Since we are unable to obtain APIs, we will store promotion data in database and fetch from there. | End June (30th June) | :white_check_mark:
Auto-Post of Requests Function | Research on other applications with similar features on how this can be implemented successfully | Mid July (17th July) | :white_check_mark:
Messaging Function | Research the technologies and languages used on other similar chatting applications. | Mid July (17th July) | :white_check_mark:
Groups Function | Program the application such that it identifies each user’s favourites. | Mid July (17th July) | :white_check_mark:
Testing | Read up on the different types of testing. Thereafter conduct the relevant tests upon successful implementations. | Ongoing | Ongoing

## System Testing Log
No. | Issue | Solution | Fixed?
----|-------|----------|-------
1 | Auto-Post Function: Couldn't call methods based on time intervals | Imported and used 'moment' libraries to use their date features | :white_check_mark:
2 | Notification Function: react-native-push-token doesn't generate push tokens properly | Had to import permissions + notifications from expo | :white_check_mark:
3 | Search Page: Data couldn't be retrieved properly because page doesn't re-render between the tab navigations | Used useIsFocused hook from @react-navigation/native. As long as pages between tabs are changed, it will cause a re-render | :white_check_mark:
4 | Sign Up Page: Upon creating new user, firebase reflects that the newly created user is signed in. However upon running code, the current signed-in user is another user | Changed workflow of the app to navigate from Signup page to Login page. Doing so make sures the current signed in user is correct. | :white_check_mark:
5 | Profile Page: Infinite loop of fetching data from firebase | Use componentWillUnmount from React Lifecycle Components to clean up any subscriptions | :white_check_mark:
6 | Edit Profile Page: Multiline placeholder text input not displayed upon rendering of page | Split address inputs into different text input field lines so each address line would be short and able to be displayed properly | :white_check_mark:
7 | Chat Page: Individual chatroom's preview latest message not displayed properly | Update firebase document field to be the latest message while simultaneously adding the message into subcollection | :white_check_mark:
8 | Edit Profile Page: Receives error of Maximum update depth exceeded due to too many setStates | Redesigned the UI/UX so editing profile doesn't require modals and Change password, Log out buttons are on Profile Page instead | :white_check_mark:
9 | React Native text input auto-capitalisation of the first letter resulted in different database fetched from firebase despite having the same email/uid string | Turn off auto-capitalisation for all text inputs in our app | :white_check_mark:
10 | Profile Page: Doesn't auto update user's picture or username after changing them on Edit Profile Page | Use componentDidUpdate from React Lifecycle Components and compared props so data would be fetched from firebase, hence displaying the latest user data on profile page | :white_check_mark:
11 | Preference Page: Page is bypassed despite being inserted in the navigations | Used firebase then() function to return a new Promise and navigate to Preference page | :white_check_mark:
12 | Chat Page: Could not find the opposing user's username and email when passed as parameters to another function from Chat to Chat Room, hence received an error due to passing an empty object to firebase | Define the parameters inside an object in Chats then pass the entire object to Chat Room | :white_check_mark:
13 | Notifications: Unable to navigate users to intended page after clicking on notification | Work In Progress! | :negative_squared_cross_mark:
14 | Preference Page: User cannot join multiple groups at once. Unable to add into array via multiple selection of items with the first click, requires a second click | Since useState hook is not async, tried useEffect hook to re-render after change in array and it didn't work. Hence, will allow user to only add 1 group into My Groups at a time so reducing the need to use arrays in useState. But still allowing users to be in multiple groups. | :white_check_mark:
15 | Chat Page: Avatar icons for both sender and receiver are the same | Work In Progress! | :negative_squared_cross_mark:
16 | Chat Page: User able to select image to send but Front End unable to display the image | Added in additional parameters into the chat object to allow the display of images sent | :white_check_mark:

## Usability Testing
Coming to you on 27 July!

## Security Features
1) Authentication: Only registered users in Collab can gain access to the application
2) Authorisation: Only registered users in Collab's database will be able to login successfully
3) Permission: Permission must be granted by the user before Collab is able to access user's camera roll or send notification to users
4) Tokenisation: Usage of tokens for login and notifications unique per user device
5) Encryption: Personal information and data are encoded so that users' privacy are secured

## Challenges Encountered
1) We tried to contact stores to obtain their APIs for easy retrieval of promotions data, but there was no response received. Hence, we will store the data in our database and fetch the data from there.
2) Authenticating with Google can be quite challenging, hence we will implement this at a later phase during Milestone 3, when most of our features are ready.
3) Some pages takes a really long loading time or requires a scroll before items can render. We will attempt to optimise the loading time of our screens in Milestone 3.
4) When searching for usernames to create a Chat Room with, user must type in the entire username in order to search for the user. We will attempt to implement realtime searching in Milestone 3 if time permits.
5) Connection to Firebase while running simulator: Quota limits are hit sometimes even though database does not reflect that limit was hit. We are not sure why does this happen but so far it is not a big issue as it only affected us a few times.

## Possible Enhancements for Milestone 3
Target | Target Date | Status
-------|-------------|-------
Additional option of Google authentication when logging in | 12 July | :white_check_mark:
Allow multiple addition of groups / preference into My Groups | 12 July | :white_check_mark:
Form Validations for emails and integers | 12 July | :white_check_mark:
Display alert if no username is found when searching for username on Chat page | 12 July | :white_check_mark:
Allow users to send images in chat rooms | 19 July | :white_check_mark:
Optimisation of loading time | 19 July | :white_check_mark:
Additional Security Features: Encryption | 19 July | :white_check_mark:
For offers listing, when progress bar reached 100%, to include an indicator to show that required minimum amount has been reached | 25 July | :negative_squared_cross_mark:
Allow users to display their avatar icons on chat rooms | 25 July | :negative_squared_cross_mark:
Auto-post frequency can have more than 1 setting | 25 July | :negative_squared_cross_mark:
Enable Google Analytics on Firebase | 25 July | :negative_squared_cross_mark:
Make screens responsive for different screen sizes | 25 July | :negative_squared_cross_mark:
