const request = require('supertest');

const app = require('../app');

const { userOne, authorOne } = require('./fixtures/data');

describe('Authors Fetched', () => {
  describe('successfully', () => {
    it('should return authors array with 200 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const res = await request(app)
        .get('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(200);
      expect(res.body.data.authors).toContainEqual(author.body.data.author);
    });
  });
  describe('unsuccessfully', () => {
    it('should return 401 with a non-logged in user', async () => {
      await request(app).get('/api/v1/authors').expect(401);
    });
  });
});

describe('Author Created', () => {
  describe('successfully', () => {
    it('should create a new author with 201 success code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      expect(author.body.data.author.creator).toBe(user.body.data.user._id);
    });
  });

  describe('unsuccessfully', () => {
    it('should send a 401 code without a logged in user', async () => {
      await request(app).post('/api/v1/users/signup').send(userOne).expect(201);
      await request(app).post('/api/v1/authors').send(authorOne).expect(401);
    });

    it('should send 400 with invalid data', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const res = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({})
        .expect(400);
      expect(res.body.message).toBe('Invalid data');
      expect(res.body.errors.length).toBe(2);
      expect(res.body.errors).toContain('Author must have a first name');
      expect(res.body.errors).toContain('Author must have a last name');
    });
  });
});

describe('Author Fetched', () => {
  describe('successfully', () => {
    it('should return a single author with 200 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const res = await request(app)
        .get(`/api/v1/authors/${author.body.data.author._id}`)
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(200);
      expect(res.body.data.author.firstName).toBe(
        author.body.data.author.firstName
      );
      expect(res.body.data.author.lastName).toBe(
        author.body.data.author.lastName
      );
      expect(res.body.data.author._id).toBe(author.body.data.author._id);
    });
  });
  describe('unsuccessfully', () => {
    it('should return 401 with a non-logged in user', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      await request(app)
        .get(`/api/v1/authors/${author.body.data.author._id}`)
        .expect(401);
    });
  });
});

describe('Author Updated', () => {
  describe('successfully', () => {
    it('should return the updated author with 200 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const res = await request(app)
        .patch(`/api/v1/authors/${author.body.data.author._id}`)
        .send({ firstName: 'Jonas', lastName: 'Drew' })
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(200);
      expect(res.body.data.author.firstName).toBe('Jonas');
      expect(res.body.data.author.lastName).toBe('Drew');
      expect(res.body.data.author._id).toBe(author.body.data.author._id);
    });
  });
  describe('unsuccessfully', () => {
    it('should return 401 with a non-logged in user', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      await request(app)
        .patch(`/api/v1/authors/${author.body.data.author._id}`)
        .send({ firstName: 'Jonas' })
        .expect(401);
    });
  });
});

describe('Author Deleted', () => {
  describe('successfully', () => {
    it('should return the 201 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      await request(app)
        .delete(`/api/v1/authors/${author.body.data.author._id}`)
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(204);
    });
  });
  describe('unsuccessfully', () => {
    it('should return 401 with a non-logged in user', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      await request(app)
        .delete(`/api/v1/authors/${author.body.data.author._id}`)
        .send({ firstName: 'Jonas' })
        .expect(401);
    });
  });
});
