# Groundwork Somerville

## Contributors
1. Manish Aryal

2. Saurav Gyawali

3. Henry Li


## Setting up Repository

1.  `cd <PATH TO WORKING DIRECTORY>`

2.  `git clone https://github.com/JumboCode/GroundWorkSomerville.git`

3.  `cd GroundWorkSomerville`

4. Install the following applications. Instructions vary depending on your OS. Refer to google or feel free to ask questions about it:
	* python3
	* pip3
	* yarn

5. Install venv using `pip3 install virtualenv`

6. Now set up a virtual environment for the backend `python3 -m venv env`

7. Activate the environment:
	* Linux/MacOS `python3 -m venv env`
	* Windows `env\Scripts\activate`

8. Install backend dependencies with `pip3 install -r requirements.txt`

9. Create and run the migrations using 
	`python3 manage.py makemigrations`
	`python3 manage.py migrate` 
	This should also be run after every change to the model

11. Install React and its dependencies with `yarn install`

  
## Running the project locally

### Run frontend server

- Build project: `yarn build`

- Start server: `yarn start`

- If the website does not automatically open, go to the link shown in terminal to see a local version

- Quit with Control+C

### Run backend server

- If the environment is not already activated, activate it using step 7 in setup instructions

- Run the server: `python manage.py runserver`

- Go to the link shown in terminal to see a local version of the backend
 - Quit with Control+C

## Git Essentials
[Here](https://education.github.com/git-cheat-sheet-education.pdf) are some essential git commands you'll need for source control in this project. Make sure you commit messages are clear and concise

Instead of directly working on the master branch we will be working on separate branches which will be merged using pull requests. 

[Here](https://help.github.com/articles/creating-a-pull-request/)  is a resource on how to make a pull request
