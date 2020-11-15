Endpoint	                                Task
POST api/session/signup  	                signing up a user
POST api/session/login	                  log in user
DELETE api/session/logout	                logout user
POST api/questions	                      User create a question
GET api/questions	                        User can view all questions
PUT api/questions/<question_id>	          User gets a single question
GET api/users/<int:user_id>/questions    	User gets all their questions (all)
GET api/users/<int:user_id>/followers    	User gets all their followers (all)
GET api/users/<int:user_id>/followings    User gets all their followings (all)
POST api/users/<int:follower_id>/followed/<int:followed_id>    follower follows the followed
GET api/users/<int:user_id>               Get user details
GET api/questions/mostanswers	            User gets questions with most answers(all)
GET api/questions/search/{search_item}	  User searches for a question or answer(all)
GET api/questions/{question_id}/answers/{answer_id}/accept	User can accept an answer to their question
GET api/questions/{question_id}/answers  	User can get all answers to specific question
DELETE api/questions/{question_id}	      User can delete the questions they post
GET api/myquestions	                      User gets all their questions (all)
GET api/questions/{question_id}/answers/{answer_id}/upvote	User can upvote an answer to their question
GET api/questions/{question_id}/answers/{answer_id}/downvote	User can downvote an answer to their question
GET api/questions/{question_id}/answers/{answer_id}/comment	User can comment on to answer to question
GET api/tags/<tagname>                    User gets all their questions with certain tag
GET api/tags/                             User gets all tags on site
GET api/tags/<int:tag_id>/posts/<int:post_id>   Tagging a question to a specific tag
