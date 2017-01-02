import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'some search text'
    };

    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add todo action object', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'test text',
        completed: false,
        createdAt: 0
      }
    }

    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });



  it('should generate add todos action object', () => {
    var todos = [
      {
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }
    ];
    var action = {
      type: 'ADD_TODOS',
      todos
    };

    var res = actions.addTodos(action.todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      update: {completed: false}
    };
    var res = actions.updateTodo(action.id, action.update);

    expect(res).toEqual(action);
  });

   describe('Tests with firebase todos', () => {
     var testTodoRef;

    beforeEach((done) => {
      var todoRef = firebaseRef.child('todos');

      todoRef.remove().then(() => {
        testTodoRef = firebaseRef.child('todos').push();

        return testTodoRef.set({
          text: 'somthing to do',
          completed: false,
          createdAt: 2345654
        })
      })
      .then(() => done())
      .catch(done)
    });

    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should create todo and dispatch ADD_TODO', (done) => {

        const store = createMockStore({});

        const todoText = 'My todo item';

        store.dispatch(actions.startAddTodo(todoText)).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual('ADD_TODO');
          expect(actions[0].todo.text).toEqual(todoText);
          done();
        }).catch(done);
      });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('UPDATE_TODO');
        expect(mockActions[0].id).toEqual(testTodoRef.key);
        expect(mockActions[0].update.completed).toBe(true);
        expect(mockActions[0].update.completedAt).toExist();
        done();
      }).catch(done);
     });

     it('should populate todos and dispatch ADD_TODOS', (done) => {
       const store = createMockStore({});
       const action = actions.startAddTodos();

       store.dispatch(action).then(() => {
         const mockActions = store.getActions();

         expect(mockActions[0].type).toEqual('ADD_TODOS');
         expect(mockActions[0].todos.length).toEqual(1);
         expect(mockActions[0].todos[0].text).toEqual('somthing to do');
         done();
       }, () => done());
     });
   });
});
