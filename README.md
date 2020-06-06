# Collab 

#### Orbital 2020 - Apollo 11

#### Authors
Ng Shi Xuan, Aerin & Alyssa Nah Xiao Ting

#### Team Name
AA Battery

#### App Description

Collab is an application that can facilitate buyers to collaborate and collate items for a bigger order to achieve higher savings.
<p align="center">
   <img src="https://i.imgur.com/V5yb6Li.png" width="600">
</p>

#### Motivation
 
For students who are staying on campus, buying groceries or online shop orders may be more costly as items are usually purchased in one or a few units. We may not always be able to find people to combine orders with to enjoy benefits like free delivery and discounts.

How convenient would it be to have a platform to consolidate orders from other interested users near you to receive bigger savings on your order? Perhaps you do not want to fork-up more money for delivery, just because you did not hit the ‘minimum amount purchased’. You will not only reduce the inconvenience of needing to find friends to bulk order with, but you can also be certain to enjoy savings during your purchase.

#### Aim
 
We want shoppers to be able to communicate with other buyers in their neighbourhood easily to consolidate orders in order to attain significant savings, such as free delivery and discounts, on their purchase.

#### User Stories

1) When I make purchases, I want to be able to receive free delivery and discounts. However, I may not have enough items in my cart to be eligible for free shipping. 
2) When my package delivery arrives and I am not around, I need someone to collect it on my behalf. Having a platform to communicate with other buyers would be helpful.
3) I want to enjoy the luxury of shopping online and not having to go to a physical store or pay delivery fees for my online order. 
4) I want to enjoy savings from purchases I make regularly without needing to go through the physical trouble of gathering people to reach the minimum purchase amount.

#### App Features
We will be developing an web application for iOS that contains these features. 
1. Auto-Post of Requests
   - Buyers who purchase items from certain stores often can set an auto-posting of requests to sub-buyers. This automates the request for more sub-buyers to join their orders based on a frequency set by the main buyers.
   - Request will be sent to other buyers via notifications.
2. Auto-Retrieval of Data from Websites 
   - Displays discounts from selected stores 
3. Messaging Function
   - Facilitates communication with other buyers
4. Groups Function
   - Notifications of any offers posted by other buyers for stores of certain categories
5. Notifications Function
   - Allow main buyers to be notified when other buyers are interested in combining orders with them.
   - Allow sub-buyers to be notified when the main buyer accepts their request to combine the order.
  
#### Program Flow
The diagram below depicts the brief overview of Collab’s workflow. 
<p align="center">
   <img src="https://i.imgur.com/bObrX8O.png" width="600">
</p>

#### How Collab Looks Like
<p align="center">
   <img src="https://i.imgur.com/F0Xs9tm.png" width="600">
</p>

When the user first opens the application, they will have to create an account before being able to login as part of authentication. 

By clicking on the ‘Sign Up’ button, they will be redirected to the ‘Register’ page. 

Upon successful login, they are brought to the main menu. The landing page will be the ‘Search’ page. There are a total of 5 tabs which the user can click on to use their features. Namely, the pages are: Search, Group, (Add) Offer, Chat, and Profile. 

(Add) Offer will lead the user to a screen displaying a list of store promotions. Thereafter, the user will fill in a form before successfully posting their offer to Collab. The necessary details are keyed in by the user, after which they will ‘Post’ and have the details saved. 

Have a look at our [Prototype](https://www.figma.com/proto/K21NBhfN3Yd1pUdjtItRIB/Collab?node-id=18%3A0&scaling=scale-down)! Actual UI/UX of our application may differ from this prototype.

#### Tech Stack
1) IDE: VS Code
2) Code: React Native, Javascript
3) Database: FireBase
4) Analytics: Google Analytics 
5) Web Server:  Apache Web Server

#### What Makes Collab Unique
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

#### Challenges Encountered
1) We tried to contact stores to obtain their APIs for easy retrieval of promotions data, but there was no response received. If we are unable to obtain APIs, we will store the data in our database and fetch the data from there.
2) Authenticating with Google can be quite challenging, hence we will implement this at a later phase, when most of our features are ready.

#### Possible Improvements
1) Additional option for Google or Facebook authentication when logging in 
2) Filters promotions for stores that are the user’s favourites

#### Development Plan
Target | Actions to reach target | Target Date (Tentative)
------------ | -------------| ------------ 
Notification Pop-ups | Understand how ‘react-native-push-notification’ works | Mid June (17th June)
Auto-Retrieval of Data from Websites Function | Reach out to relevant stores to request utilizing their APIs. Understand how APIs work (to request, passing the authentication etc). If unable to obtain APIs, will store data in database and fetch from there. | End June (30th June)
Auto-Post of Requests Function | Research on other applications with similar features on how this can be implemented successfully | Mid July (17th July)
Messaging Function | Research the technologies and languages used on other similar chatting applications. | Mid July (17th July)
Groups Function | Program the application such that it identifies each user’s favourites. | Mid July (17th July)
Testing | Read up on the different types of testing. Thereafter conduct the relevant tests upon all successful implementations. | TBC

### Have a look at our [Milestone 1 Project Log](https://drive.google.com/file/d/1fzQ8Rud7MHVu-OflHw9KMOSbr1W-3Z2g/view?usp=sharing) to find out more! :relaxed:
