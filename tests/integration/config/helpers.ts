import * as mocha     from "mocha";
import * as Chai      from "chai";
import * as td        from "testdouble";
import * as supertest from "supertest";
import      App       from "../../../server/api/api";

const app         = App;
const request     = supertest;
const expect      = Chai.expect;
const testDouble  = td;

export { app, request, expect, testDouble };  
