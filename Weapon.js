class Weapon{
    numberOfRounds; //Number of projectiles which have been fired so far
    capacity; //Total number of projectiles which can be fired
    weaponType; //Takes different values depending upon weapon type
    static BULLET_TYPE = 0;
    static LASER_TYPE = 1;
    static BULLET_CAPACITY = 10;
    static LASER_CAPACITY = 1;
    
    constructor(weaponType){
        if(weaponType == Weapon.BULLET_TYPE){
            this.weaponType = weaponType;
            this.capacity = Weapon.BULLET_CAPACITY;
            this.numberOfRounds = 0;
        }
        else if(weaponType == Weapon.LASER_TYPE){
            this.weaponType = weaponType;
            this.capacity = Weapon.LASER_CAPACITY;
            this.numberOfRounds = 0;
        }
    }

    getAmmo() {
        return this.capacity - this.numberOfRounds;
    }
    
}
