export function generateMockData(tr: IDBTransaction) {
  const users = tr.objectStore('users');
  const logs = tr.objectStore('logs');

  addUserLog(
    users.add({
      name: 'Bob',
      email: 'bob@mail.ru',
      age: 42,
      skills: ['code', 'dance'],
      stats: {health: 20},
    }),
  );

  addUserLog(
    users.add({
      name: 'Max',
      email: 'max@mail.ru',
      age: 45,
      skills: ['code'],
      stats: {health: 70},
    }),
  );

  addUserLog(
    users.add({
      name: 'Elton',
      email: 'elton@mail.ru',
      age: 15,
      skills: ['dance', 'sign'],
      stats: {health: 100},
    }),
  );

  addUserLog(
    users.add({
      name: 'Elvis',
      email: 'elvis@mail.ru',
      age: 42,
      skills: ['dance', 'sign'],
      stats: {health: 88},
    }),
  );

  addUserLog(
    users.add({
      name: 'Dina',
      email: 'dina@mail.ru',
      age: 18,
      skills: ['code'],
      stats: {health: 99},
    }),
  );

  function addUserLog(req: IDBRequest) {
    req.addEventListener(
      'success',
      () => {
        logs.add({id: req.result, type: 'ADD', time: new Date()});
      },
      {once: true},
    );
  }
}
