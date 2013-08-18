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
});