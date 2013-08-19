'use strict';

describe('intro task',function(){
    it('should run task scenario',function(){
        var vessel = new Vessel('Яндекс', [0,0], 1000);
        var planetA = new Planet('A', [0,0], 0);
        var planetB = new Planet('B', [100, 100], 5000);

        expect(vessel.report()).toEqual(
            'Корабль "Яндекс". Местоположение: 0,0. Товаров нет.'
        );
        expect(planetA.report()).toEqual(
            'Планета "A". Местоположение: 0,0. Грузов нет.'
        );
        expect(planetB.report()).toEqual(
            'Планета "B". Местоположение: 100,100. Доступно груза: 5000т.'
        );

        vessel.flyTo(planetB);
        planetB.loadCargoTo(vessel, 1000);

        expect(vessel.report()).toEqual(
            'Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.'
        );

        vessel.flyTo(planetA);
        planetA.unloadCargoFrom(vessel, 500);

        expect(vessel.report()).toEqual(
            'Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.'
        );
        expect(planetA.report()).toEqual(
            'Планета "A". Местоположение: 0,0. Доступно груза: 500т.'
        );
        expect(planetB.report()).toEqual(
            'Планета "B". Местоположение: 100,100. Доступно груза: 4000т.'
        );
    });
});