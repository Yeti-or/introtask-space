'use strict';

describe('Vessel',function(){
    describe('Creation',function(){
        it('should create vessel with name,position & capacity',function(){
            expect(Vessel).toBeDefined();
            var shurik = new Vessel('Shurik',[0,0],1000);
            expect(shurik).toBeDefined();
            expect(shurik.name).toBe('Shurik');
            expect(shurik.position).toEqual([0,0]);
            expect(shurik.capacity).toBe(1000);
        });
        it('should create vessel only with all three params',function(){
            expect(function(){new Vessel();}).toThrow();
            expect(function(){new Vessel('Bolshoi');}).toThrow();
            expect(function(){new Vessel('Theater',[20,20]);}).toThrow();
        });
        it('should have position with two coordinates',function(){
            expect(function(){new Vessel('Titanic',[0,0,-1000],4000);}).toThrow();
            expect(function(){new Vessel('Single',[1],4000);}).toThrow();
        });
        it('should have positive capacity',function(){
           expect(function(){new Vessel('Unsinkable',[0,0],-1000);}).toThrow();
        });
    });

    describe('Report',function(){
       var calcifer;
       beforeEach(function(){
            calcifer = new Vessel('Fire',[0,0],10);
       });
       it('should have method report',function(){
          expect(calcifer.report).toBeDefined();
       });
       it('should report about it\'s state',function(){
          expect(calcifer.report()).toEqual(
            'Корабль "Fire". Местоположение: 0,0. Товаров нет.'
          );
          var pearl = new Vessel('Black pearl',[100,200],3000);
          expect(pearl.report()).toEqual(
              'Корабль "Black pearl". Местоположение: 100,200. Товаров нет.'
          );
       });
    });

    describe('Free space',function(){
        var marvin;
        beforeEach(function(){
            marvin = new Vessel('Marvin',[0,0],2000);
        });

        it('should have method getFreeSpace()',function(){
           expect(marvin.getFreeSpace).toBeDefined();
        });
        it('should have method getOccupiedSpace()',function(){
           expect(marvin.getOccupiedSpace).toBeDefined();
        });

        it('should return free or occupiedSpace',function(){
           expect(marvin.getFreeSpace()).toBe(2000);
           expect(marvin.getOccupiedSpace()).toBe(0);
        });
    });

    describe('Flying',function(){
        var marvin;
        beforeEach(function(){
            marvin = new Vessel('Marvin',[0,0],2000);
        });

        it('should have method flyTo()',function(){
            expect(marvin.flyTo).toBeDefined();
        });
        it('should flyTo point',function(){
            marvin.flyTo([100,200]);
            expect(marvin.position).toEqual([100,200]);
        });
        it('should flyTo planet',function(){
            var farPlanet = new Planet('Paranoid',[3000,30],4000);
            marvin.flyTo(farPlanet);
            expect(marvin.position).toEqual([3000,30]);
        });
        it('should not fly to dumb stuff',function(){
            expect(function(){marvin.flyTo('strawberry field');}).toThrow();
            expect(function(){marvin.flyTo();}).toThrow();
            expect(function(){marvin.flyTo([0,100,20]);}).toThrow();
            expect(function(){marvin.flyTo('=)');}).toThrow();
        });
    });
});