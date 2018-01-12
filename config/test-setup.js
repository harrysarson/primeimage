/* eslint-disable */
const chai = require('chai');

chai.use(require('chai-iterator'));
chai.use(require('sinon-chai'));
chai.use(require('chai-dom'));
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
