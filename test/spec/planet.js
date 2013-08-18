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
    });

    describe("Planet amount of cargo",function(){
        var mars;
        beforeEach(function(){
            mars = new Planet('Mars',[0,0],1000);
        });
        it("should have getAvailableAmountOfCargo method",function(){
            expect(mars.getAvailableAmountOfCargo).toBeDefined();
        });
        it("should return value of cargo",function(){
           expect(mars.getAvailableAmountOfCargo()).toEqual(
               "Доступно груза: 1000т."
           );
        });
        it("should return special string when value is zero",function(){
            var venus = new Planet('Venus',[100,200],0);
           expect(venus.getAvailableAmountOfCargo()).toEqual(
               "Грузов нет."
           );
        });
    });

    describe("port",function(){
        var mars;
        var mice;
        var earth;
        beforeEach(function(){
            mars = new Planet('Mars',[100,200],4000);
            mice = new Vessel("Rockers",[0,0],1000);
            earth = new Planet('Earth',[300,300],0);
        });

        it('should have methods load/unloadCargoTo/From()',function(){
            expect(mars.loadCargoTo).toBeDefined();
            expect(mars.unloadCargoFrom).toBeDefined();
            expect(mice.flyTo).toBeDefined();//depends on landing
        });

        it('should not load to vessel, if vessel not landed',function(){
            //vessel didn't flyTo(mars)
            expect(function(){mars.loadCargoTo(mice,100);}).toThrow();
        });

        it('should not unload from vessel, if vessel not landed',function(){
            //vessel didn't flyTo(mars)
            expect(function(){earth.unloadCargoFrom(mice,100);}).toThrow();
        });

        describe('load',function(){
            beforeEach(function(){
                mice.flyTo(mars);
            });

            it('should loadCargo to vessel',function(){
                mars.loadCargoTo(mice,1000);
                expect(mars.getAvailableAmountOfCargo()).toEqual(
                    "Доступно груза: 3000т."
                );
                expect(mice.getFreeSpace()).toBe(0);
                expect(mice.getOccupiedSpace()).toBe(1000);
            });

            it('can be load by parts',function(){
                mars.loadCargoTo(mice,300);
                mars.loadCargoTo(mice,200);
                expect(mars.getAvailableAmountOfCargo()).toEqual(
                    "Доступно груза: 3500т."
                );
                expect(mice.getFreeSpace()).toBe(500);
                expect(mice.getOccupiedSpace()).toBe(500);
            });

            it('should load valid amount of cargo ',function(){
                expect(function(){mars.loadCargoTo(mice,-100);}).toThrow();
                expect(function(){mars.loadCargoTo(mice,"giraffe");}).toThrow();
            });
            it('should load amount not bigger then capacity of vessel',function(){
                expect(function(){mars.loadCargoTo(mice,3000);}).toThrow();
            });
            it('should load amount not bigger then planet have',function(){
                expect(function(){mars.loadCargoTo(mice,5000);}).toThrow();
            });
            it('should load to vessel',function(){
                expect(function(){mars.loadCargoTo("Black hole",100);}).toThrow();
            });
        });

        describe('unload',function(){
            beforeEach(function(){
                mice.flyTo(mars);
                mars.loadCargoTo(mice,700);
                mice.flyTo(earth);
            });

            it('should unload cargo from vessel',function(){
                earth.unloadCargoFrom(mice,300);
                expect(earth.getAvailableAmountOfCargo()).toEqual(
                    "Доступно груза: 300т."
                );
                expect(mice.getFreeSpace()).toBe(600);
                expect(mice.getOccupiedSpace()).toBe(400);
            });

            it('should unload valid amount',function(){
                expect(function(){earth.unloadCargoFrom(mice,-900)}).toThrow();
                expect(function(){earth.unloadCargoFrom(mice,"giraffe")}).toThrow();
            });
            it('should not unload more then vessel has',function(){
                expect(function(){earth.unloadCargoFrom(mice,900)}).toThrow();
            });
            it('should unload from vessel',function(){
                expect(function(){mars.unloadCargoFrom("Black hole",100);}).toThrow();
            });
        });

    });

});
