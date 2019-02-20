// Memory Mapper

MM = {
    /*
    _memory map:

    [0000-3FFF] Cartridge ROM, bank 0
        [0000-00FF] BIOS
        [0100-014F] Cartridge Header
    [4000-7FFF] Cartridge Rom, other banks
    [8000-9FFF] GPU RAM
        [8000-97FF] Tile RAM
        [9800-9BFF] BG Map Data 1
        [9C00-9FFF] BG Map Data 2
    [A000-BFFF] External RAM !!RAM MOUNTED HERE IS NON-VOLATILE, KEEPS GAME DATA, ETC
    [C000-DFFF] RAM
    [E000-FDFF] RAM shadow
    [FE00-FE9F] Sprite Information (OAM)
    [FF00-FF7F] MemMapped IO
    [FF80-FFFF] Zero-Page RAM
    */
    
    _booting: 1,
    _bootSeq: [],
    _cartridge: [],
    _memory: [],

    init: function(){
        for(i=0;i<0xffff;i++){
            MM._memory[i]=0
        }
    },

    load: function(game){
        console.log("Loading game!");
        MM._cartridge = game
        MM.reset();
    },

    reset: function(){
        MM.init();
        MM._booting = 1;
    },

    //long_addr: return value of 2 registers
    l_addr: function(first, second){
        var f = first & 0xff
        var s = second & 0xff
        return f<<8+s;
    },

    //read one byte at address
    read: function(addr){
        if(MM._booting != 1){
            return MM._memory[addr]
        } 

        else if(MM._booting==1){
            if(addr<0x100){
                return MM._bootSeq[addr]
            }
        }
    },

//    write value to address
    write: function(addr,value){
        var v = value.split('');
        for(var k=0;k<v.length;k++){
            MM._memory[addr+k]=v[k]
        }
    }
}

module.exports = MM;
