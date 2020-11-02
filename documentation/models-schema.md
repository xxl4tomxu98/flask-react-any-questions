* User:

- User_Name => String
- Email => String
- Member_Since => DateTime
- Points => Integer
- Id (Primary Key) => Integer

* Question:

- Question Id (Primary Key) => Integer
- User Id (Foreign Key) => Integer
- Asked => Time
- Content => Text
- Tags => String (Comma seperated keyword values)
- AcceptedAnswerId: The answer that’s been accepted as the “right” answer to the question. It’s an Answer type.
- AnswerCount: The number of answers to the question.
- DownvoteCount: The number of times the question has been downvoted. Users can typically upvote and downvote questions just like they can upvote and downvote answers.
- UpvoteCount: The number of times the question has been upvoted.
- Catgory: Explains what type of the question is. If you’re creating a forum, then the question is about your forum topic.


* Vote:

- Type (Boolean) =>  Integer
- Id (Primary Key) => Integer
- User Id (Foreign Key) => Integer
- Question Id(Foreign Key) => Integer
- Comment Id(Foreign Key) => Integer
- Answer Id(Foreign Key) => Integer



* Answer:
- Answer Id (Primary Key) => Integer
- Question Id (Foreign Key) => Integer
- User Id (Foreign Key) => Integer
- Created => Time
- UpvoteCount => Integer
- DownvoteCount => Integer
- Content => Text

* Comments (Only 1 level):
- Comment Id (Primary key) => Integer
- Question Id (Foreign Key) => Integer
- Answer Id (Foreign Key) => Integer
- User Id (Foreign Key) => Integer

* Login:
- Using wtforms, flask-login (Own)
- Session Handline done by flask-login package

* Pagination:
- For post there will be multiple pages

* Index:
- Options (Answered/Unanswered/All)
- Index will show unanswered questions

* Frameworks Used:
- Flask
