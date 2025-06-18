// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createScheme(db: IDBDatabase, _tr: IDBTransaction) {
  const usersStore = db.createObjectStore('users', {keyPath: 'id', autoIncrement: true});

  usersStore.createIndex('age', 'age');
  usersStore.createIndex('email', 'email', {unique: true});
  usersStore.createIndex('skills', 'skills', {multiEntry: true});
  usersStore.createIndex('allSkills', 'skills');
  usersStore.createIndex('name+age', ['name', 'age']);
  usersStore.createIndex('health', 'stats.health');

  db.createObjectStore('logs', {
    keyPath: ['id', 'type', 'time'],
  });

  db.createObjectStore('blobs');
}
