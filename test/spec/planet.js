'use strict';

describe("A planet", function() {
    describe("Planet creation",function(){
        it("should create planet with name, position & amountOfCargo", function() {
            var mars = new Planet('Mars',[0,0],1000);
            expect(mars).toBeDefined();
            expect(mars.name).toBe('Mars');
            expect(mars.position).toEqual([0,0]);
            expect(mars.cargo).toBe(1000);
        });
        it("should create Planet only with 3 params",function(){
            expect(function(){ new Planet('Mars',[0,0]) }).toThrow();
            expect(function(){ new Planet('Mars') }).toThrow();
            expect(function(){ new Planet() }).toThrow();
        });
        it("should have two coordinates",function(){
            expect(function(){ new Planet('Mars',[0],1000)}).toThrow();
            expect(function(){ new Planet('Mars',[0,1,2],1000)}).toThrow();
        });
        it("should have positive cargo",function(){
            expect(function(){ new Planet('Mars',[0,0],-1000)}).toThrow();
        });
    });

    describe()
});
