process.env.NODE_ENV = 'test';

const Post = require('../models/Post');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Posts', () => {
  beforeEach((done) => {
    Post.remove({}, (err) => {
      done();
    });
  });

  describe('GET /posts', () => {
    it('should GET all the posts', (done) => {
      chai.request(server)
        .get('/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.posts.should.be.a('array');
          res.body.posts.length.should.be.eql(0);

          done();
        });
    });
  });

  describe('POST /posts', () => {
    it('should not post without a title', (done) => {
      let post = {
        author: 'Kevin'
      };

      chai.request(server)
        .post('/posts')
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.have.property('kind').eql('required');

          done();
      });
    });

    it('should not post without an author', (done) => {
      let post = {
        title: 'Hello World!'
      };

      chai.request(server)
        .post('/posts')
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('author');
          res.body.errors.author.should.have.property('kind').eql('required');

          done();
      });
    });

    it('should post a book', (done) => {
      let post = {
        title: 'Hello World!',
        author: 'Kevin'
      };

      chai.request(server)
        .post('/posts')
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.a.property('post');
          res.body.post.should.have.a.property('title');
          res.body.post.should.have.a.property('author');

          done();
      });
    });
  });

  describe('GET /posts/:id', () => {
    it('should get a post by the given id', (done) => {
      let post = new Post({
        title: 'Hello World!',
        author: 'Kevin'
      });

      post.save((err, post) => {
        chai.request(server)
          .get('/posts/' + post.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.a.property('post');
            res.body.post.should.have.a.property('title');
            res.body.post.should.have.a.property('author');
            res.body.post.should.have.a.property('_id').eql(post.id);

            done();
        });
      });
    });
  });

  describe('PUT /posts/:id', () => {
    it('should update a post by the given id', (done) => {
      let post = new Post({
        title: 'Hello World!',
        author: 'Kevin'
      });

      post.save((err, post) => {
        chai.request(server)
          .put('/posts/' + post.id)
          .send({ author: 'Kevin Pagtakhan' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.a.property('post');
            res.body.post.should.have.a.property('author').eql('Kevin Pagtakhan');

            done();
        });
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete a post by the given id', (done) => {
      let post = new Post({
        title: 'Hello World!',
        author: 'Kevin Pagtakhan'
      });

      post.save((err, post) => {
        chai.request(server)
          .delete('/posts/' + post.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.a.property('result');
            res.body.result.should.have.a.property('ok').eql(1);
            res.body.result.should.have.a.property('n').eql(1);

            done();
        });
      });
    });
  });
});
