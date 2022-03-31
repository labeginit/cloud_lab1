# DA376E VT22 Lab 1 

The web app is deployed here: <https://radiant-fortress-71791.herokuapp.com/>  

## The end points 
/allansson (Will show my name)  
/game  (here you play Arcade Snake game)  
/error (will show en error page in case of a wrong path)  
The hyperlinks on the default page can help navigate to the above mentioned pages (not the error page).

## Steps done to deploy the application

1.  I have created a project with three end points. It worked locally via nodemon. Pushed it to the GitHub repo. 
2.  A free accoint on Heroku was created. 
3.  Heroku CLI installed by using the command   
    *brew tap heroku/brew && brew install heroku*  
    Heroku was installed on my MacOS without problems.
4.  Created a Heroku project (link) and a git repo:  
    *heroku create*  
    ![The result of Create command execution](/img/heroku_1.png)
5.  Pushed the project to Heroku Git repo:  
    *git push heroku main*
6. Verified the deployment:  
    *heroku ps:scale web=1*  
    One dyno is used by the app.  

    **liliia@Lee-MacBook-Pro cloud_lab1 % heroku ps:scale web=1**
    **›   Warning: heroku update available from 7.59.4 to 7.60.0.**
    **Scaling dynos... done, now running web at 1:Free** 

7.  Attempt to open the link by *heroku open* showed that the application crashed. Using the command *heroku logs –-tail* helped discover several errors in the project which are related only to heroku functioning. They were:  
*‘npm ERR! Missing script: "start"’* and *Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch*  
The first one was solved by editing the package.json file. Another error was related to the port number that was hardcoded in index.js. It took a few attempts to solve the errors.
8. After commiting the final changes the local validation was performed:  
    *npm install*  
    *heroku local* - result OK  
9.  The changes pushed to heroku  *git heroku push main*
10. Command *heroku open* opened the webpage and this time it was shown.  
![The running webapp!](/img/heroku_1.png)    
The application is available at  <https://radiant-fortress-71791.herokuapp.com/> 