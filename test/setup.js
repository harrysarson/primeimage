
const chai = require('chai');

chai.use(require('chai-iterator'));
chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.sinon = require('sinon');
