const request = require('supertest');

const app = require('../app');

const { userOne, authorOne, bookOne } = require('./fixtures/data');

describe('Books Fetched', () => {
  describe('successfully', () => {
    it('should return books array with 200 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const book = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({ ...bookOne, author: author.body.data.author })
        .expect(201);
      const res = await request(app)
        .get('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(200);
      expect(res.body.data.books).toContainEqual(book.body.data.book);
    });
  });
  describe('unsuccessfully', () => {
    it('should return 401 with a non-logged in user', async () => {
      await request(app).get('/api/v1/books').expect(401);
    });
  });
});

describe('Book Created', () => {
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
      const book = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({ ...bookOne, author: author.body.data.author })
        .expect(201);
      expect(book.body.data.book.creator).toBe(user.body.data.user._id);
      expect(book.body.data.book.author.firstName).toBe(
        author.body.data.author.firstName
      );
    });
  });

  describe('unsuccessfully', () => {
    it('should send a 401 code without a logged in user', async () => {
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
        .post('/api/v1/books')
        .send({ ...bookOne, author: author.body.data.author })
        .expect(401);
    });

    it('should send 400 with invalid data', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const res = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send()
        .expect(400);
      expect(res.body.message).toBe('Invalid data');
      expect(res.body.errors.length).toBe(3);
      expect(res.body.errors).toContain('Book must belong to an Author');
      expect(res.body.errors).toContain('A Book must have an isbn');
      expect(res.body.errors).toContain('A Book must have a name');
    });
  });
});

describe('Book Fetched', () => {
  describe('successfully', () => {
    it('should fetch a single book with 200 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const book = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({ ...bookOne, author: author.body.data.author })
        .expect(201);
      const res = await request(app)
        .get(`/api/v1/books/${book.body.data.book._id}`)
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(200);
      expect(res.body.data.book.name).toBe(book.body.data.book.name);
      expect(res.body.data.book.isbn).toBe(book.body.data.book.isbn);
      expect(res.body.data.book.author.firstName).toBe(
        author.body.data.author.firstName
      );
    });
  });

  describe('unsuccessfully', () => {
    it('should send a 401 code without a logged in user', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const book = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({ ...bookOne, author: author.body.data.author })
        .expect(201);
      await request(app)
        .get(`/api/v1/books/${book.body.data.book._id}`)
        .expect(401);
    });
  });
});

describe('Book Updated', () => {
  describe('successfully', () => {
    it('should return an updated book with 200 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const book = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({ ...bookOne, author: author.body.data.author })
        .expect(201);
      const res = await request(app)
        .patch(`/api/v1/books/${book.body.data.book._id}`)
        .send({ name: 'New book name' })
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(200);
      expect(res.body.data.book.name).toBe('New book name');
    });
  });
});

describe('Book delete', () => {
  describe('successfully', () => {
    it('should return a 204 code', async () => {
      const user = await request(app)
        .post('/api/v1/users/signup')
        .send(userOne)
        .expect(201);
      const author = await request(app)
        .post('/api/v1/authors')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send(authorOne)
        .expect(201);
      const book = await request(app)
        .post('/api/v1/books')
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .send({ ...bookOne, author: author.body.data.author })
        .expect(201);
      await request(app)
        .delete(`/api/v1/books/${book.body.data.book._id}`)
        .set('Authorization', `Bearer ${user.body.data.token}`)
        .expect(204);
    });
  });
});
