var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'search text'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });

  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(false),df(action));

      expect(res).toEqual(true);
    });
  });

  describe('todoReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: '123abc',
          text: 'something to do',
          completed: false,
          createdAt: 123456
        }
      };

      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should toggle todo', () => {
      var todos = [{
        id: '123',
        text: 'todo test',
        completed: true,
        createdAt: 123,
        completedAt: 456
      }];
      var update = {
        completed: false,
        completedAt: null
      };
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        update
      };

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].completed).toBe(update.completed);
      expect(res[0].compledtedAt).toBe(update.compledtedAt);
      expect(res[0].text).toEqual(todos[0].text);

    });
    it('should add existing todos', () => {
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
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
