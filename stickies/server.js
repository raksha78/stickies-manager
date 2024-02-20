const express = require('express');
const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const stickies = require('./stickies');

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/session', (req, res) => {

    const sid = req.cookies?.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';


    if(!sid || !users.isValid(username)){
        res.status(401).json({ error: 'auth-missing'});
        return;
    }
    res.json({username});
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;
  
    if(!users.isValid(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
  
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
  
    if(!existingUserData) {
    //   users.addUserData(username, todos.makeTodoList());
        users.addUserData(username, stickies.makeStickieList());
    }
  
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getStickies());
  });

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(sid) {
        res.clearCookie('sid');
    }

    if(username){ 
        sessions.deleteSession(sid);
    }

    res.json( {username} );
});

app.post('/api/stickies', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    const { title, colour, type } = req.body;

    const stickieList = users.getUserData(username);
    const id = stickieList.addStickie(title, colour, type);
    res.json( stickieList.getStickie(id) );
});

app.get('/api/stickies', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !users.isValid(username)){
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json( users.getUserData(username).getStickies() );
});

app.delete('/api/stickies/:stickieId', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const { stickieId } = req.params;
    const stickieList = users.getUserData(username);
    const stickieExists = stickieList.contains(stickieId);

    if(stickieExists) {
        stickieList.deleteStickie(stickieId);
    }
    
    res.json({message: stickieExists ? `stickie ${stickieId} deleted` : `stickie ${stickieId} did not exist` });
});

app.post('/api/stickies/:stickieId/todo', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const { stickieId } = req.params;
    const { task } = req.body;

    if(!stickieId) {
        res.status(400).json({ error: 'required-stickie' });
        return;
    }

    if(!task) {
        res.status(400).json({ error: 'required-task' });
        return;
    }

    const stickieList = users.getUserData(username);
    const id = stickieList.addTodo(stickieId, task);

    res.json(stickieList.getTodo(stickieId, id));
});

app.get('/api/stickies/:stickieId/todos', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !users.isValid(username)){
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { stickieId } = req.params;

    res.json( users.getUserData(username).getTodos(stickieId) );

});

app.patch('/api/stickies/:stickieId/todos/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const { stickieId, id } = req.params;
    const { task, done } = req.body;

    const stickieList = users.getUserData(username);

    if(!stickieList.contains(stickieId)){
        res.status(404).json({ error: `noSuchId`, message: `No stickie with id ${stickieId}` });
        return;
    }

    if(!stickieList.containsTodo(stickieId, id)){
        res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
        return;
    }

    stickieList.updateTodo(stickieId, id, { task, done });
    res.json(stickieList.getTodo(stickieId, id));
});

app.delete('/api/stickies/:stickieId/todos', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const { stickieId } = req.params;
    const { id } = req.body;
    const stickieList = users.getUserData(username);
    const stickieExists = stickieList.contains(stickieId);
    let todoExists;

    if(stickieExists) {
        todoExists = stickieList.containsTodo(stickieId, id);

        if( todoExists ){
            stickieList.deleteTodo(stickieId, id);
        }
    }
    
    res.json({message: todoExists ? `todo ${id} deleted` : `todo ${id} did not exist` });
});

app.patch('/api/stickies/:stickieId', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const { stickieId } = req.params;
    const { noteContent } = req.body;

    const stickieList = users.getUserData(username);

    if(!stickieList.contains(stickieId)){
        res.status(404).json({ error: `noSuchId`, message: `No stickie with id ${stickieId}` });
        return;
    }

    stickieList.updateNotes(stickieId, noteContent);
    res.json( { message: `Stickie ${stickieId} 's notes updated`} );
});

app.listen( PORT, () => console.log(`Listening on http://localhost:${PORT}`));