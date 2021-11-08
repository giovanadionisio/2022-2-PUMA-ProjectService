const assert = require('assert');
const utils = require('../../src/utils/functions');


describe('src/utils/functions -> checkInt', () =>{
  it('check a correct int', (done) => {
      const res = utils.checkInt(1);
      assert.equal(res ,true);
      done();
  });

  it('check a incorrect int', (done) => {
      const res = utils.checkInt('a');
      assert.equal(res ,false)
      done();
  });
});