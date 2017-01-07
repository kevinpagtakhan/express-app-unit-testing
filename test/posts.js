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
          res.body.should.be.a('object');
          res.body.posts.should.be.a('array');
          res.body.posts.length.should.be.eql(0);

          done();
        });
    });
  });
});
