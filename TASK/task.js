'use strict';

/**
 * Validate position
 * @param {Number[]} position
 * @returns {boolean}
 */
var checkPosition = function(position){
    return position && position.length === 2 &&
        typeof position[0] === 'number' &&
        typeof position[1] === 'number';
};

/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number[]} position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    if(!name){throw new Error('All params are required');}
    if(!position){throw new Error('All params are required');}
    if(typeof capacity !== 'number'){throw new Error('All params are required');}
    if(!checkPosition(position)){
        throw new Error('Position must be with two coordinates');
    }
    if(capacity<0){throw new Error('Capacity must be positive value');}
    this.name = name;
    this.position = position;
    this.capacity = capacity;

    this.cargo = 0;
    this.planet = null;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    return 'Корабль "'+this.name+'". Местоположение: '+this.position+'. Товаров нет.';
};

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    return this.capacity - this.cargo;
};

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    return this.cargo;
};

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number[]} position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    if(!name){throw new Error('All params are required');}
    if(!position){throw new Error('All params are required');}
    if(typeof availableAmountOfCargo !== 'number'){throw new Error('All params are required');}
    if(!checkPosition(position)){throw new Error('Position must be with two coordinates');}
    if(availableAmountOfCargo<0){throw new Error('Cargo must be positive value');}
    this.name = name;
    this.position = position;
    this.cargo = availableAmountOfCargo;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number[]|Planet} newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.flyTo
 */
Vessel.prototype.flyTo = function (newPosition) {
    if(newPosition instanceof Planet && checkPosition(newPosition.position)){
        this.position = newPosition.position;
        this.planet = newPosition;
    }else if(checkPosition(newPosition)){
        this.position = newPosition;
        this.planet = null;
    }else {
        throw new Error("I wouldn't go there!");
    }
};

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    return "Планета \"" + this.name + "\". " +
        "Местоположение: "+this.position+". "+
        this.getAvailableAmountOfCargo();
};

/**
 * Возвращает доступное количество груза планеты.
 * @name Planet.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return (this.cargo) ? "Доступно груза: "+this.cargo+"т." : "Грузов нет.";
};

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Planet.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if(!vessel instanceof Vessel) {throw new Error('Hey where is my boat?');}
    if(typeof cargoWeight !== 'number' || cargoWeight < 0){throw new Error('Bad amount of cargo');}
    if(cargoWeight > this.cargo){throw new Error("Sorry we have no money");}
    if(cargoWeight > vessel.capacity){throw new Error("To much for me!");}
    if(vessel.planet && vessel.planet === this){
        vessel.cargo += cargoWeight;
        this.cargo -= cargoWeight;
    }else {
        throw new Error('No teleportation sorry');
    }
};

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Planet.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if(!vessel instanceof Vessel) {throw new Error('Hey where is my boat?');}
    if(typeof cargoWeight !== 'number' || cargoWeight < 0){throw new Error('Bad amount of cargo');}
    if(cargoWeight > vessel.cargo){ throw new Error("You want to much from me!");}
    if(vessel.planet && vessel.planet === this){
        vessel.cargo -= cargoWeight;
        this.cargo += cargoWeight;
    }else {
        throw new Error('No teleportation sorry');
    }
};
