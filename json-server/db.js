/* eslint-disable */
const faker = require('faker');

module.exports = () => {
  const data = {
    boards: [],
    issues: [],
    logTimes: [],
    users: [],
    tags: [],
    issueStatus: []
  }

  const genreteUser = () => ({
    id: faker.random.number({ min: 1 }),
    name: faker.name.firstName() + ' ' + faker.name.lastName()
  });

  data.users = Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => genreteUser())

  const genreteTags = () => {
    const tag = faker.lorem.slug()
    return {
      id: tag,
      name: tag
    }
  };

  data.tags = Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => genreteTags())

  data.issueStatus = [
    {
      value: 1,
      text: 'Backlog'
    },
    {
      value: 2,
      text: 'InProgress'
    },
    {
      value: 4,
      text: 'Review'
    },
    {
      value: 8,
      text: 'Done'
    }
  ]

  const genreteIssue = (status) => ({
    id: faker.random.number({ min: 1 }),
    userId: faker.random.arrayElement(data.users.map(x => x.id)),
    title: faker.lorem.text(),
    type: faker.lorem.word(),
    text: faker.lorem.text(),
    tags: faker.random.arrayElements(data.tags.map(x => x.id)),
    status: status
  });

  data.boards.push({
    title: 'Backlog',
    id: faker.random.number({ min: 1 }),
    issues: []
  });

  data.boards.push({
    title: 'In Progress',
    id: faker.random.number({ min: 1 }),
    issues: []
  });

  data.boards.push({
    title: 'Review',
    id: faker.random.number({ min: 1 }),
    issues: []
  });

  data.boards.push({
    title: 'Done',
    id: faker.random.number({ min: 1 }),
    issues: []
  });

  data.issues = [
    ...Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => genreteIssue(1)),
    ...Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => genreteIssue(2)),
    ...Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => genreteIssue(4)),
    ...Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => genreteIssue(8))
  ]

  return data
}