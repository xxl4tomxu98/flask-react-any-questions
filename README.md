# any-questions-flask-react
Clone based off https://www.stackoverflow.com/.

# Features
## Create and search questions
Account holders are able to ask their questions on this site to get others to answer them. Bystanders may search questions and their answers, make comments etc.

Whether or not they have an account, people are allowed to search for topics and question, answers around their interest based on database or API data.

People ask questions, others vote on the answers, and the top is answer is featured.

## Ask or delete questions
Puzzled users looking for the right question and answers may search and find threads leading to their questions. Answers which have been voted high are pulled ahead for others to view. Users with higher points will have better reputation so their next answers will be pulled ahead as well.

This also benefit the restaraunt since it'll save time by already having the seats reserved and so they can use the extra time to provide quicker, high quality service.

## Votes/comments
These are used to guage interaction between the users and the question and author. Ratings are tied to the answers but are created by the users.

Note: Comments are not private, so the comments should be honest and provide valid criticsm.

## Favorites and saved topics
Users who find a questions they concerned by key words, search algorithms to look for these questions semantically is important. User can also bookmark the questions for future reference.

## Bonus: Question Categories and Comment on Questions / Answers
## Bonus: Polymorphic Up/Down Votes: Questions, Answers, Comments, Tags, Follows

While the backend Flask API is a fairly standard RESTful API, it requires authentication with a Cookie. Cross origin communication is protected by CSRF token that is facilitated also by React hooks API. The Flask server grabs the redux token for CSRF everytime it fetches to the Flask backend, which is used in all requests to the "any questions" server. Redux also stores and sets information about the active posts, whichever that has been selected by the user. By managing this state in Redux, it provides easy access to the information across components without prop threading. This was particularly important because there were so many components in the application and could further increase in the future. If too many components were re-rendering constantly because of state change it would cause significant performance issues or crash the application completely. Redux provided a relatively simple way to manage this point of complexity.

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in conclusion).

Code for "any questions" auth flow:
```.js
function App() {

    let location = useLocation();
    let dispatch = useDispatch();
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);

    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
            }
        }
        restoreCSRF();
    }, []);


    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);
}
```
#Redux store:
```.js
export const login = (email, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authentication.csrf;
        const res = await fetchWithCSRF('/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user));
        }

    }
}
```

# Flask React Project

This is the backend for the Flask React project using SqlAlchemy and Psycopg-2.

## Getting started

1. Clone this repository

2. Install dependencies
   ```bash
   pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   python -m database && flask run
   ```
6. To run the React App in development, checkout the [README](./client/README.md) inside the client directory.




***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***


## Deploy to Heroku
Approach A. Deploy via Dockerfile and heroku Docker container
1. Create a new project on Heroku

2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"

3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)

4. Run
   ```bash
   heroku login
   ```
5. Login to the heroku container registry
   ```bash
   heroku container:login
   ```
6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"

7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry
   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```
8. Release your docker container to heroku
   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```
9. set up your database:
   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} python -m database
   ```
10. Under Settings find "Config Vars" and add any additional/secret .env variables.
11. profit

Approach B Deploy via Heroku's container Dyno
1. Create a new project on Heroku

2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"

3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)

4. Run
   ```bash
   heroku login
   ```
5. Create in root directory Procfile and have this line in it:(since we are not using Dockerfile anymore)
    web: gunicorn starter_app:app

6. Add a package.json at the root level of the app with the following:
    ```.json
    {
      "name": "starter",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "heroku-prebuild": "npm install --prefix client && npm run build --prefix client"
      }
    }
    ```

7. ```bash
    heroku buildpacks:add --index 1 heroku/nodejs
   ```
8. update __init__.py in app_starter with the following:
    app = Flask(__name__, static_folder='../client/build', static_url_path='/')

9. delete Pipfile and Pipfile.lock in root directory

10. Add the above two files in your root directory .gitignore file

11. Add psycopg2-binary==2.8.6 from dev-requirements.txt into requirements.txt file

12. Connect to remote heroku

   ```bash
    heroku git:remote -a flask-react-any-questions
   ```

13. Push to heroku

    ```bash
      git push heroku
    ```

14. Setup database in remote herokuy and run app

    ```bash
      heroku run -a flask-react-any-questions python -m database
    ```
