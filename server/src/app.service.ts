import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return [
      {
        name: 'Bob',
        email: 'bob@mail.ru',
        age: 42,
        skills: ['code', 'dance'],
        stats: {health: 20},
      },
      {
        name: 'Max',
        email: 'max@mail.ru',
        age: 45,
        skills: ['code'],
        stats: {health: 70},
      },
      {
        name: 'Elton',
        email: 'elton@mail.ru',
        age: 15,
        skills: ['dance', 'sign'],
        stats: {health: 100},
      },
      {
        name: 'Elvis',
        email: 'elvis@mail.ru',
        age: 42,
        skills: ['dance', 'sign'],
        stats: {health: 88},
      },
      {
        name: 'Dina',
        email: 'dina@mail.ru',
        age: 18,
        skills: ['code'],
        stats: {health: 99},
      },
    ];
  }
}
