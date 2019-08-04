const chai = require("chai");
const supertest = require("supertest");

const app = require("./../src/app");

global.request = supertest(app);
global.expect = chai.expect;
