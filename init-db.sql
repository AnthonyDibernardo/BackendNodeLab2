-- To reset the database, enter the following in the terminal:
-- mysql zybooksdb < init-db.sql

DROP TABLE IF EXISTS question;

CREATE TABLE question (
   id INTEGER AUTO_INCREMENT,
   category VARCHAR(200) NOT NULL,
   text VARCHAR(200) NOT NULL,
   answer1 VARCHAR(50) DEFAULT NULL,
   answer2 VARCHAR(50) DEFAULT NULL,
   answer3 VARCHAR(50) DEFAULT NULL,
   answer4 VARCHAR(50) DEFAULT NULL,
   PRIMARY KEY (id)
);

INSERT INTO question (category, text, answer1, answer2, answer3, answer4) VALUES
   ('Sports', 'Which player holds the NHL record of 2,857 points?', 
      'Wayne Gretzky', 'Mario Lemieux', 'Alex Ovechkin', 'Brett Hull'),
   ('Sports', 'What is the term used for bowling three consecutive strikes?', 
      'Turkey', 'Pigeon', 'Birdie', 'Eagle'),
   ('History', 'Who was the second president of the United States?',
      'John Adams', 'James Madison', 'Thomas Jefferson', 'Abraham Lincoln'),
   ('Music', 'What was the best selling album of 2023?',
      '1989 (Taylor\'s Version) by Taylor Siwft', 
      'Trustfall by Pink', 
      '5-Star by Stray Kids', 
      'UTOPIA by Travis Scott');
