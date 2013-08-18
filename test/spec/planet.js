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

    describe("Planet report",function(){
        var mars;
       beforeEach(function(){
            mars = new Planet('Mars',[0,0],1000);
       });
       it("should have report method",function(){
           expect(mars.report).toBeDefined();
       });
       it("should report about it's state",function(){
           expect(mars.report()).toEqual(
             "Планета \"Mars\". Местоположение: 0,0. Доступно груза: 1000т."
           );
           var venus = new Planet('Venus',[100,200],5000);
           expect(venus.report()).toEqual(
               "Планета \"Venus\". Местоположение: 100,200. Доступно груза: 5000т."
           );
       });
       it("should have special report for no cargo",function(){
           var earth = new Planet('Earth',[20,20],0);
           expect(earth.report()).toEqual(
               "Планета \"Earth\". Местоположение: 20,20. Грузов нет."
           );
       });
    })

});
