'use strict';

describe("A planet", function() {
    describe("Planet creation",function(){
        it("should create planet with name, position & amountOfCargo", function() {
            var mars = new Planet('Mars',[0,0],1000);
            expect(mars.name).toBe('Mars');
        });
    });
});
