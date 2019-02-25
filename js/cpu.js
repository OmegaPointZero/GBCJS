/* 
    Virtual CPU - Modified Z80 chipset

    Opcodes and instruction sets are documented at 
        >http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf
        >http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html
        >http://imrannazar.com/Gameboy-Z80-Opcode-Map

    Processor object has registers, a clock, a series of functions that 
    modify the registers according to the operations described by the 
    resources above, an "exec" function that receives an instruction, looks
    it up and calls the function to emulate that register change.

    Opcodes functions are not written in order, I wrote them based off of
    the color coding @http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html   

*/

instr = {

        // SPECIAL INSTRUCTIONS
        
        // 0x00
        NOP: function(callback){
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x10
        STOP: function(callback){
            processor._reg.stop = 1;
            processor._reg.m = 2;
            processor._reg.t = 4;
            callback()
         },
        //0x76
        HALT: function(callback){
            processor._halt = 1;
            processor._reg.m = 1;
            processor._reg.t = 4;   
            callback()
         },

        //0xF3 
        DI: function(callback) { /* disable interrupts */
            processor._reg.i = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0xFB 
        EI: function(callback) { /* enable interrupts */
            processor._reg.i = 1;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        CB: function(callback) {
           /* Read next byte to lookup CB function in that table */
            processor._reg.pc++;
            console.log(MM.read(processor._reg.pc))
            /* 
                here shall go a function to find 
                the CB-prefixed instructions
            */
            callback()
         },
        // 8-bit Load/Move/Store instructions

        //0x7F
        LD_aa: function(callback){
            processor._reg.a = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x78 
        LD_ab: function(callback) {
            processor._reg.a = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x79
        LD_ac: function(callback) {
            processor._reg.a = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x7A
        LD_ad: function(callback) {
            processor._reg.a = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x7B
        LD_ae: function(callback){
            processor._reg.a = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x7C
        LD_ah: function(callback){
            processor._reg.a = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x7D
        LD_al: function(callback){
            processor._reg.a = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        
        //0x47
        LD_ba: function(callback){
            processor._reg.b = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x40 
        LD_bb: function(callback){
            processor._reg.b = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x41
        LD_bc: function(callback){
            processor._reg.b = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x42
        LD_bd: function(callback){
            processor._reg.b = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x43
        LD_be: function(callback){
            processor._reg.b = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x44
        LD_bh: function(callback){
            processor._reg.b = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x45
        LD_bl: function(callback){
            processor._reg.b = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x4F
        LD_ca: function(callback){
            processor._reg.c = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x48
        LD_cb: function(callback){
            processor._reg.c = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x49
        LD_cc: function(callback){
            processor._reg.c = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x4A
        LD_cd: function(callback){
            processor._reg.c = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x4B
        LD_ce: function(callback){
            processor._reg.c = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x4C
        LD_ch: function(callback){
            processor._reg.c = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x4D
        LD_cl: function(callback){
            processor._reg.c = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x57
        LD_da: function(callback){
            processor._reg.d = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x50 
        LD_db: function(callback){
            processor._reg.d = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x51
        LD_dc: function(callback){
            processor._reg.d = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x52
        LD_dd: function(callback){
            processor._reg.d = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x53
        LD_de: function(callback){
            processor._reg.d = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x54
        LD_dh: function(callback){
            processor._reg.d = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x55
        LD_dl: function(callback){
            processor._reg.d = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x5F
        LD_ea: function(callback){
            processor._reg.e = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x58
        LD_eb: function(callback){
            processor._reg.e = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x59
        LD_ec: function(callback){
            processor._reg.e = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x5A
        LD_ed: function(callback){
            processor._reg.e = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x5B
        LD_ee: function(callback){
            processor._reg.e = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x5C
        LD_eh: function(callback){
            processor._reg.e = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x5D
        LD_el: function(callback){
            processor._reg.e = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x67
        LD_ha: function(callback){
            processor._reg.h = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x60 
        LD_hb: function(callback){
            processor._reg.h = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x61
        LD_hc: function(callback){
            processor._reg.h = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x62
        LD_hd: function(callback){
            processor._reg.h = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x63
        LD_he: function(callback){
            processor._reg.h = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x64
        LD_hh: function(callback){
            processor._reg.h = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x65
        LD_hl: function(callback){
            processor._reg.h = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x6F
        LD_la: function(callback){
            processor._reg.l = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x68
        LD_lb: function(callback){
            processor._reg.l = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x69
        LD_lc: function(callback){
            processor._reg.l = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x6A
        LD_ld: function(callback){
            processor._reg.l = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x6B
        LD_le: function(callback){
            processor._reg.l = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x6C
        LD_lh: function(callback){
            processor._reg.l = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x6D
        LD_ll: function(callback){
            processor._reg.l = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //   Other 8-bit load/move/store instructions
        
        //0x02
        LD_aBC_A: function(callback){
            var bc = processor._reg.b<<8;
            bc += processor._reg.c;
            MM.write(bc,processor._reg.a);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },
        
        //0x12
        LD_aDE_A: function(callback){
            var bc = processor._reg.d<<8;
            de += processor._reg.e;
            MM.write(bc,processor._reg.a);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x22
        LD_aHLi_A: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(hl,processor._reg.a);
            hl += 1;
            processor._reg.h=(hl&0xff00)>>8;
            processor._reg.l=(hl&0xff);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x32
        LD_aHLd_A: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(hl,processor._reg.a);
            hl -= 1;
            processor._reg.h=(hl&0xff00)>>8;
            processor._reg.l=(hl&0xff);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x06
        LD_Bd8: function(callback){
            processor._reg.pc++
            processor._reg.b=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x16
        LD_Dd8: function(callback){
            processor._reg.pc++
            processor._reg.d=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x26
        LD_Hd8: function(callback){
            processor._reg.pc++
            processor._reg.b=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x36
        LD_aHLd8: function(callback){
            processor._reg.pc++
            var hl = processor._reg.h<<8
            hl+=processor._reg.l;
            MM.write(hl, MM.read(processor._reg.pc));
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
         },

        //0x0a
        LD_AaBC: function(callback){
            processor._reg.pc++
            var bc = processor._reg.b<<8
            bc+=processor._reg.c;
            MM.write(bc, MM.read(processor._reg.pc));
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x1a
        LD_AaDE: function(callback){
           processor._reg.pc++
            var de = processor._reg.d<<8
            de+=processor._reg.e;
            MM.write(de, MM.read(processor._reg.pc));
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x2a
        LD_AaHLi: function(callback){
            processor._reg.pc++
            var bc = processor._reg.b<<8
            bc+=processor._reg.c;
            MM.write(bc, MM.read(processor._reg.pc));
            hl++;
            processor._reg.h=hl&0xff00>>8;
            processor._reg.l=hl&0xff;
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x3a
        LD_AaHLd: function(callback){
            processor._reg.pc++
            var bc = processor._reg.b<<8
            bc+=processor._reg.c;
            MM.write(bc, MM.read(processor._reg.pc));
            hl++;
            processor._reg.h=hl&0xff00>>8;
            processor._reg.l=hl&0xff;            
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x0e
        LD_Cd8: function(callback){
            processor._reg.pc++;
            processor._reg.c=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x1e
        LD_Ed8: function(callback){
            processor._reg.pc++;
            processor._reg.e=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x2e
        LD_Ld8: function(callback){
            processor._reg.pc++;
            processor._reg.l=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x3e
        LD_Ad8: function(callback){
            processor._reg.pc++;
            processor._reg.a= MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0xe0
        LD_ff00nA: function(callback){
            var ad = 0xff00;
            processor._reg.pc++;
            ad += MM.read(processor._reg.pc);
            MM.write(ad,processor._reg.a);
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
         },
           
        //0xf0
        LD_Aff00n: function(callback){
            var ad = 0xff00;
            processor._reg.pc++;
            ad += MM.read(processor._reg.pc);
            MM.write(processor._reg.a,MM.read(ad));
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
         },
    
        //0xe2
        LD_ff00cA: function(callback){
            var ac = 0xff00;
            processor._reg.pc++;
            ac += MM.read(processor._reg.pc);
            MM.write(ac,processor._reg.a);
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },
           
        //0xf2
        LD_Aff00c: function(callback){
            var ac = 0xff00;
            processor._reg.pc++;
            ac += MM.read(processor._reg.pc);
            write(processor._reg.a,MM.read(ac));
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0xea
        LD_nnA: function(callback){
            processor._reg.pc++;
            adr = processor._reg.pc;
            adr = adr<<8;
            processor._reg.pc++;
            adr == processor._reg.pc;
            MM.write(adr,processor._reg.a);
            processor._reg.m=4;
            processor._reg.t=16;
            callback()
         },
           
        //0xfa
        LD_Ann: function(callback){
            processor._reg.pc++;
            adr = processor._reg.pc;
            adr = adr<<8;
            processor._reg.pc++;
            adr == processor._reg.pc;
            MM.write(adr,processor._reg.a);
            processor._reg.m=4;
            processor._reg.t=16;
            callback()
         },

        //0x46
        LD_BaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.b = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x56
        LD_DaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.d = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x66
        LD_HaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.h = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x4E
        LD_CaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.c = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x5E
        LD_EaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.e = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x6E
        LD_LaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.l = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x7E
        LD_AaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.a = MM.read(hl)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x70
        LD_aHLB: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.b)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x71
        LD_aHLC: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.c)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x72
        LD_aHLD: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.d)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x73
        LD_aHLE: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.e)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x74
        LD_aHLH: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.h)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x75
        LD_aHLL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.l)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },

        //0x77
        LD_aHLA: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            MM.write(MM.read(hl),processor._reg.a)
            processor._reg.m=2;
            processor._reg.t=8;
            callback()
         },
        /*
            16-BIT MOVE/LOAD/STORE INSTRUCTIONS
        */

        //0x01
        LD_BCnn: function(callback){
            processor._reg.pc++;
            MM.write(processor._reg.c,processor._reg.pc);
            processor._reg.pc++;
            MM.write(processor._reg.b,processor._reg.pc);
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
         },
           
        //0x11
        LD_DEnn: function(callback){
            processor._reg.pc++;
            MM.write(processor._reg.e,processor._reg.pc);
            processor._reg.pc++;
            MM.write(processor._reg.d,processor._reg.pc);
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
         },

        //0x21
        LD_HLnn: function(callback){
            processor._reg.pc++;
            processor._reg.l = MM.read(processor._reg.pc)
            processor._reg.pc++;
            processor._reg.h = MM.read(processor._reg.pc)
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
         },
           
        //0x31
        LD_SPnn: function(callback){
            processor._reg.pc++;
            var s = MM.read(processor._reg.pc);
            processor._reg.pc++;
            var p = MM.read(processor._reg.pc);
            p = (p<<8) + s;
            processor._reg.sp = p;
            processor._reg.m=3;
            processor._reg.t=12;
            callback()
            callback()
         },

        //0x08
        LD_nnSP: function(callback){
            processor._reg.pc++;
            var a = MM.read(processor._reg.pc)<<8;
            processor._reg.pc++;
            a += MM.read(processor._reg.pc);
            MM.write(a,processor._reg.sp);
            processor._reg.m=5;
            processor._reg.t=20;
            callback()
         },

        //0xC1
        POP_BC: function(callback){
            processor._reg.c = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.b = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
            callback()
         },

        //0xD1
        POP_DE: function(callback){
            processor._reg.e = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.d = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
            callback()
         },

        //0xE1
        POP_HL: function(callback){
            processor._reg.l = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.h = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
            callback()
         },

        //0xF1
        POP_AF: function(callback){
            processor._reg.f = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.a = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
            callback()
         },

        //0xC5
        PUSH_BC: function(callback){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.b);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.c);
            processor._reg.m=4;
            processor._reg.t=16;            
            callback()
         },

        //0xD5
        PUSH_DE: function(callback){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.d);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.e);
            processor._reg.m=4;
            processor._reg.t=16;            
            callback()
         },

        //0xE5
        PUSH_HL: function(callback){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.h);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.l);
            processor._reg.m=4;
            processor._reg.t=16;            
            callback()
         },

        //0xF5
        PUSH_AF: function(callback){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.a);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.f);
            processor._reg.m=4;
            processor._reg.t=16;            
            callback()
         },

        /* Take SIGNED 8-bit immediate to SP, and save it in HL */
        //0xF8
        LDHL_SPd8: function(callback){
            processor._reg.pc++
            var b = (MM.read(processor._reg.pc))<<8;
            /* Interpret byte as signed 8-bit*/
            /* s: signed; m:masked b*/
            var s = b&0x80;
            var m = b&0x7F;
            var sp = processor._reg.sp;
            /* if the byte isn't signed, sp+*/
            if(s==0){
                sp += m;
            } else if (s==128){
                sp = (sp-128)+m;
            }
            processor._reg.h = sp>>8;
            processor._reg.l = sp&0xff;
            processor._reg.m=3;
            processor._reg.t=12;            
            callback()
         },

        //0xF9
        LD_SPHL: function(callback){


            processor._reg.m=2;
            processor._reg.t=8;            
            callback()
         },


        /* 
            Reset and jump routines-- jump to address in memory and execute
        */

        //0xC7
        R_0: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x00;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0xD7
        R_10: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x10;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0xE7
        R_20: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x20;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },
        
        //0xF7
        R_30: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x30;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0xCF
        R_8: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x8;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0xDF
        R_18: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x18;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0xEF
        R_28: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x28;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0xFF
        R_38: function(callback){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x38;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
            callback()
         },

        //0x20
        JRNZn: function(callback){
            /* 
                CONDITIONAL JUMP TO 8-BIT SIGNED IMMEDIATE IF PREVIOUS RESULT 
                WAS NOT ZERO 

                FUNCTION OBJECTIVES: 
                    1. CHECK IF THE ZERO FLAG IS SET (_REG.F&=0x80>0)
                    2. IF IT IS NOT SET, INTERPRET THE NEXT BYTE AS SIGNED
                        2a. SEE IF HIGHEST BIT IS SET
                        2b. GET NUMBER WITHOUT HIGHEST BIT (B&=0X7F)
                        2c. IF NO HIGHEST BIT SET, ADD NUMBER TO _REG.PC
                        2d. IF HIGHEST BIT SET, ADD NUMBER TO _REG.PC AND -128
                    3. IF IT IS, CONTIN8UE (DON'T JUMP OR FUCK WITH _REG.PC)

            */ 

            processor._reg.pc++;
            var byte = MM.read(processor._reg.pc)
            if(!(processor._reg.f & 0x80 )) {
                var num = byte & 0x7F;
                var neg = byte & 0x80;
                num -= neg;
                processor._reg.pc += num;
                processor._reg.pc -= 1;
            } 
            callback()
         },

        //0x30
        JRNCn: function(callback){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<4) != 0x10){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o) -1;
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte -1
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.t = 8;
            } 
            callback()
         },

        //0x18
        JRn: function(callback){
            processor._reg.pc++;
            var byte = MM.read(processor._reg.pc)
            if(byte&(1<<7)==0x80){
                var o = byte&0x7f;
                processor._reg.pc = processor._reg.pc + (-128+o)-1;
                processor._reg.m = 3;
                processor._reg.t = 12;
            } else if(byte&(1<<7)!=0x80){
                processor._reg.pc = processor._reg.pc + byte-1
                processor._reg.m = 3;
                processor._reg.t = 12;
            }
            callback()
         },

        //0x28
        JRZn: function(callback){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<7) == 0x80){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o);
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte -1;
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.t = 8;
            } 
            callback()
         },

        //0x38
        JRCn: function(callback){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<4) == 0x10){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o);
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte -1
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.t = 8;
            } 
            callback()
         },

        //0xC0
        RETNZ: function(callback) { 
            processor._reg.m=2;
            processor._reg.t=8;
            if(processor._reg.f&0x80 == 0){
                processor._reg.m=5;
                processor._reg.t=20;
                processor._reg.pc = processor._reg.sp -1;
                processor._reg.sp += 2;
            }
            callback();
        },

        //0xD0
        RETNC: function(callback) { 
            processor._reg.m=2;
            processor._reg.t=8;
            if(processor._reg.f&0x10 == 0){
                processor._reg.m=5;
                processor._reg.t=20;
                processor._reg.pc = processor._reg.sp -1;
                processor._reg.sp += 2;
            }
            callback();
        },

        //0xC8
        RETZ: function(callback) { 
            processor._reg.m=2;
            processor._reg.t=8;
            if(processor._reg.f&0x80 != 0){
                processor._reg.m=5;
                processor._reg.t=20;
                processor._reg.pc = processor._reg.sp -1;
                processor._reg.sp += 2;
            }
            callback();
        },

        //0xD8
        RETC: function(callback) { 
            processor._reg.m=2;
            processor._reg.t=8;
            if(processor._reg.f&0x10 != 0){
                processor._reg.m=5;
                processor._reg.t=20;
                processor._reg.pc = processor._reg.sp -1;
                processor._reg.sp += 2;
            }
            callback();
        },

        //0xC9
        RET: function(callback) { 
            processor._reg.pc = processor._reg.sp;
            processor._reg.sp += 2;
            processor._reg.m=4;
            processor._reg.t=16;
            callback();
        },
        
        //0xCA
        RETI: function(callback) { 
            /* FIGURE OUT WHAT THIS DOES DIFFERENT FROM RET */
            processor._reg.pc = processor._reg.sp;
            processor._reg.sp += 2;
            processor._reg.m=4;
            processor._reg.t=16;
            callback();
        },

        /* A16: ABSOLUTE ADDRESS*/
        //0xC2
        JPNZa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x80 == 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.pc = a -1;
            }
            callback();
        },

        //0xD2
        JPNCa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x10 == 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.pc = a -1;
            } else {
                callback();
            }
        },

        //0xCA
        JPZa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x80 != 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.pc = a -1;
            }
            callback();
        },

        //0xDA
        JPCa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x10 != 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.pc = a -1;
            } else {
                callback();
            }
        },

        //0xC3
        JPa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            processor._reg.pc++;
            var a = MM.read(processor._reg.pc);
            processor._reg.pc++;
            a += MM.read(processor._reg.pc)<<8;
            processor._reg.pc = a -1;
            callback();
        },

        //0xE9
        JPaHL: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            var a = processor._reg.h<<8;
            a += processor._reg.l;
            processor._reg.pc = a -1;
            callback();
        },

        //0xC4
        CALLNZa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x80 == 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.sp-=2;
                MM.write(processor._reg.sp,processor._reg.pc)
                processor._reg.pc = a -1;
            }
            callback();
        },

        //0xD4
        CALLNCa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x10 == 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.sp-=2;
                MM.write(processor._reg.sp,processor._reg.pc)
                processor._reg.pc = a -1;
            } else {
                callback();
            }
        },

        //0xCA
        CALLZa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x80 != 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.sp-=2;
                MM.write(processor._reg.sp,processor._reg.pc)
                processor._reg.pc = a -1;
            }
            callback();
        },

        //0xDA
        CALLCa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            if(processor._reg.f&0x10 != 0){
                processor._reg.m=4;
                processor._reg.t=16;
                processor._reg.pc++;
                var a = MM.read(processor._reg.pc);
                processor._reg.pc++;
                a += MM.read(processor._reg.pc)<<8;
                processor._reg.sp-=2;
                MM.write(processor._reg.sp,processor._reg.pc)
                processor._reg.pc = a -1;
            } else {
                callback();
            }
        },

        //0xDB
        CALLa16: function(callback) { 
            processor._reg.m=3;
            processor._reg.t=12;
            processor._reg.pc++;
            var a = MM.read(processor._reg.pc);
            processor._reg.pc++;
            a += MM.read(processor._reg.pc)<<8;
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc)
            processor._reg.pc = a -1;
            callback();
        },

        /* 
            8-bit arithmetic sequences
        */

        //0x04
        INC_B: function(callback){
            processor._reg.f &= 0x10; /* reset the flags, preserve carry flag*/
            processor._reg.b++;
            /*set half carry, not carry! */
            if((processor._reg.b&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            /*Register can only be 8 bits*/
            processor._reg.b&=255;
            /* if operation resulted in 0, set 0 flag */
            if(processor._reg.b==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x05
        DEC_B: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.f += (1<<6); /* N-flag set */
            processor._reg.b--;
            processor._reg.b&=255;
            /* Set half carry if lower 4 bits went from 0000>1111
            Can be hardcoded because only decrementing by one
            */
            if((processor._reg.b&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.b==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x14
        INC_D: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.d++;
            if((processor._reg.d&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.d&=255;
            if(processor._reg.d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x15
        DEC_D: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.d--;
            processor._reg.f += (1<<6)
            processor._reg.d&=255;
            if((processor._reg.d&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x24
        INC_H: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.h++;
            if((processor._reg.h&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.h&=255;
            if(processor._reg.h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x25
        DEC_H: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.h--;
            processor._reg.f += (1<<6)
            processor._reg.h&=255;
            if((processor._reg.h&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x34
        INC_aHL: function(callback){
            processor._reg.f &= 0x10;
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            h++;
            MM.write(hl,h);
            if((h&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            h &= 0xffff;
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x35
        DEC_aHL: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.f += (1<<6); 
            var h = processor._reg.h<<8;
            h += processor._reg.l; 
            h--;
            if((h&0xf)==0xf){
                flag += (1<<5)
            }
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },


        //0x0C
        INC_C: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.c++;
            if((processor._reg.c&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.c&=255;
            if(processor._reg.c==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x0D
        DEC_C: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.c--;
            processor._reg.f += (1<<6);
            processor._reg.c&=255;
            if((processor._reg.c&0xf)==0xf){
                processor._reg.f += (1<<5);
            }
            if(processor._reg.c==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x1C
        INC_E: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.e++;
            if((processor._reg.e&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.e&=255;
            if(processor._reg.e==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x1D
        DEC_E: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.e--;
            processor._reg.f += (1<<6)
            processor._reg.e&=255;
            if((processor._reg.e&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.e==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },
        //0x2C
        INC_L: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.l++;
            if((processor._reg.l&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.l&=255;
            if(processor._reg.l==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x2D
        DEC_L: function(callback){
            processor._reg.l--;
            processor._reg.f &= 0x10;
            processor._reg.f += (1<<6)
            processor._reg.l&=255;
            if((processor._reg.l&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.l==0){
                /* if operation resulted in 0, set 0 flag */
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x3C
        INC_A: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.a++;
            if((processor._reg.a&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.a&=255;
            if(processor._reg.a==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },

        //0x3D
        DEC_A: function(callback){
            processor._reg.f &= 0x10;
            processor._reg.a--;
            processor._reg.f += (1<<6);
            processor._reg.a&=255;
            if((processor._reg.a&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.a==0){
                /* if operation resulted in 0, set 0 flag */
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            callback()
         },


        /* 
            16-bit arithmetic instructions
        */

        //0x03
        INC_BC: function(callback){
            var b = processor._reg.b<<8;
            b += processor._reg.c;
            b++;
            if((b&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            b &= 0xffff;
            if(b==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.b = b>>8;
            processor._reg.c = b&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x0B
        DEC_BC: function(callback){
            processor._reg.f = (1<<6); 
            var d = processor._reg.d<<8;
            d += processor._reg.e; 
            h--;
            if((d&0xf)==0xf){
                flag += (1<<5)
            }
            if(d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.d = d>>8;
            processor._reg.e = d&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },


        //0x13
        INC_DE: function(callback){
            processor._reg.f = 0; 
            var d = processor._reg.d<<8;
            d += processor._reg.e;
            d++;
            if((d&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            d &= 0xffff;
            if(d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.d = d>>8;
            processor._reg.e = d&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x1B
        DEC_DE: function(callback){
            processor._reg.f = (1<<6); 
            var d = processor._reg.d<<8;
            d += processor._reg.e; 
            d--;
            if((d&0xf)==0xf){
                flag += (1<<5)
            }
            if(d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.d = d>>8;
            processor._reg.e = d&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x23
        INC_HL: function(callback){
            processor._reg.f = 0; 
            var h = processor._reg.h<<8;
            h += processor._reg.l;
            h++;
            if((h&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            h &= 0xffff;
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.h = h>>8;
            processor._reg.l = h&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x2B
        DEC_HL: function(callback){
            processor._reg.f = (1<<6); 
            var h = processor._reg.h<<8;
            h += processor._reg.l; 
            h--;
            if((h&0xf)==0xf){
                flag += (1<<5)
            }
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.h = h>>8;
            processor._reg.l = h&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
 
        //0x09
        ADD_HLBC: function(callback){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            var bc = processor._reg.b<<8;
            bc+= processor._reg.c;
            /* check for half-carry */
            if(((processor._reg.c&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            /* Check for carry */
if((hl+bc)&0xff!=(hl+bc)){
                processor._reg.f += (1<<4)
            }
            hl+=bc;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
            callback()
         },

        //0x19
        ADD_HLDE: function(callback){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            var de = processor._reg.d<<8;
            de+= processor._reg.e;
            if(((processor._reg.e&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            if((hl+de)&0xff!=(hl+de)){
                processor._reg.f += (1<<4)
            }
            hl+=de;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
            callback()
         },

        //0x29
        ADD_HLHL: function(callback){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            if(((processor._reg.l&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            if((hl+hl)&0xff!=(hl+hl)){
                processor._reg.f += (1<<4)
            }
            hl+=hl;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
            callback()
         },

        //0x39
        ADD_HLSP: function(callback){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            var sp=process._reg.sp;
            if(((sp&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            if((hl+sp)&0xff!=(hl+sp)){
                processor._reg.f += (1<<4)
            }
            hl+=sp;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
        },

        //0xE8
        ADD_SPn: function(callback){
            processor._reg.f = 0;
            /* Zero and sub flags set to 0, H and C get set*/
            processor._reg.pc++;
            var n = MM.read(processor._reg.pc);
            var sp = processor._reg.sp;
            var p = sp & 0xff;
            if((n&0xf+p&0xf)&0x10==0x10){
                processor._reg.f += (1<<5);
            }
            if((n+p)&0xff!=(n+p)){
                processor._reg.f += (1<<4);   
            }
            sp+=n;
            processor._reg.sp = sp&0xffff;
            processor._reg.m = 4;
            processor._reg.t = 16;
            callback()
         },

        //0x27
        DAA: function(callback){
            /* 
                Weird instruction, not very well documented. Corrects/prepares the A register for BCD instructions. 

                Exact process is apparently the following: take the least significant 4 bits of A. If the H flag is set or if the number is over 9, 0x6 is added to the register. The A register's 4 most significant bits get checked, If THIS digit is over 9 or the C flag is set, then 0x60 is added to the register. 
            */

            var h = (processor._reg.a>>4)&0xf;
            var l = processor._reg.a&0xf;
            var hf = processor._reg.f&(1<<5);
            var cf = processor._reg.f&(1<<4);
            if((l>9)||(hf==32)){
                processor._reg.a+=0x6;
            }  
            if((h>0)||(cf==16)){
                processor._reg.a+=0x60;
            }

            processor._reg.f=0;
            if(processor._reg.a==0){
                processor._reg.f+=(1<<7)
            }
            if((processor._reg.a&0xff) != processor._reg.a){
                processor._reg.f+=(1<<4)
            }
            processor.register.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x37
        SCF: function(callback){
            /* Literally just sets the carry flag */ 
            processor._reg.f &= (1<<7);
            processor._reg.f += (1<<4);
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x1F
        CPL: function(callback){
            processor._reg.f &= 144;
            processor._reg.f += 1<<6;
            processor._reg.f += 1<<5;
            processor._reg.m = 1;
            processor._reg.t = 4;        
            callback()
         },

        //0x3F
        CCF: function(callback){
            processor._reg.f &= (1<<7);
            processor._reg.f += (1<<4);
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },

        //0x80
        ADD_ab: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.b&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.b) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.b)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.b;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x81
        ADD_ac: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.c&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.c) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.c)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.c;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x82
        ADD_ad: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.d&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.d) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.d)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.d;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x83
        ADD_ae: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.e&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.e) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.e)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.e;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x84
        ADD_ah: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.h&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.h) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.h;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0x85
        ADD_al: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.l&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.l) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.l)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.l;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0x86
        ADD_aaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + h&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + h) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.h;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },      
 
        //0x87
        ADD_aa: function(callback){
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + processor._reg.a&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + processor._reg.a) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + processor._reg.a)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += processor._reg.a;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x90
        SUB_B: function(callback){
            /* Set N flag for subtraction */
            processor._reg.f = (1<<6);
            /* test for half carry per https://www.reddit.com/r/EmuDev/comments/4clh23/trouble_with_halfcarrycarry_flag/ */
            if((processor._reg.a & 0xf) - (processor._reg.b & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            /* Set carry if b>a*/
            if(processor._reg.b > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            
            /* test if zero */
            if((processor._reg.a - processor._reg.b)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.b;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x91
        SUB_C: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.c & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.c > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.c)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.c;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x92
        SUB_D: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.d & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.d > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.d)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.d;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0x93
        SUB_E: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.e & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.e > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.e)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.e;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x94
        SUB_H: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.h & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.h > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.h;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0x95
        SUB_L: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.l & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.l > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.l)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.l;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0x96
        SUB_aHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (h & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(h > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= h;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x97
        SUB_A: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.a & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.a > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.a)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= processor._reg.a;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x88
        ADDC_ab: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.b;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x89
        ADDC_ac: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.c;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x8A
        ADDC_ad: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.d;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x8B
        ADDC_ae: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.e;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x8C
        ADDC_ah: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.h;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x8D
        ADDC_al: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.l;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         }, 
      
        //0x8E
        ADDC_aaHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= h;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },      
 
        //0x8F
        ADDC_aa: function(callback){
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= processor._reg.a;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x98
        SUBC_B: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.b
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x99
        SUBC_C: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.c
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x9A
        SUBC_D: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.d
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x9B
        SUBC_E: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.e
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x9C
        SUBC_H: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.h
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x9D
        SUBC_L: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.l
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },   
    
        //0x9E  
        SUBC_aHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += h
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0x9F
        SUBC_A: function(callback){
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += processor._reg.a
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? processor._reg.f+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0xA0
        AND_B: function(callback){
            processor._reg.a &= processor._reg.b;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA0
        AND_C: function(callback){
            processor._reg.a &= processor._reg.c;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA0
        AND_D: function(callback){
            processor._reg.a &= processor._reg.d;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA3
        AND_E: function(callback){
            processor._reg.a &= processor._reg.e;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA4
        AND_H: function(callback){
            processor._reg.a &= processor._reg.h;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA5
        AND_L: function(callback){
            processor._reg.a &= processor._reg.l;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA6
        AND_aHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            processor._reg.a &= h;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA7
        AND_A: function(callback){
            processor._reg.a &= processor._reg.a;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA8
        XOR_B: function(callback){
            processor._reg.a ^= processor._reg.b;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xA9
        XOR_C: function(callback){
            processor._reg.a ^= processor._reg.c;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xAA
        XOR_D: function(callback){
            processor._reg.a ^= processor._reg.d;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xAB
        XOR_E: function(callback){
            processor._reg.a ^= processor._reg.e;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xAC
        XOR_H: function(callback){
            processor._reg.a ^= processor._reg.h;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xAD
        XOR_L: function(callback){
            processor._reg.a ^= processor._reg.l;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xAE
        XOR_aHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            processor._reg.a ^= h;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xAF
        XOR_A: function(callback){
            processor._reg.a ^= processor._reg.a;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB0
        OR_B: function(callback){
            processor._reg.a |= processor._reg.b;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB1
        OR_C: function(callback){
            processor._reg.a |= processor._reg.c;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB2
        OR_D: function(callback){
            processor._reg.a |= processor._reg.d;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB3
        OR_E: function(callback){
            processor._reg.a |= processor._reg.e;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB4
        OR_H: function(callback){
            processor._reg.a |= processor._reg.h;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB5
        OR_L: function(callback){
            processor._reg.a |= processor._reg.l;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB6
        OR_aHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            processor._reg.a |= h;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB7
        OR_A: function(callback){
            processor._reg.a |= processor._reg.a;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xB8
        CP_B: function(callback){
            /* Set N flag for subtraction */
            processor._reg.f = (1<<6);
            /* test for half carry per https://www.reddit.com/r/EmuDev/comments/4clh23/trouble_with_halfcarrycarry_flag/ */
            if((processor._reg.a & 0xf) - (processor._reg.b & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            /* Set carry if b>a*/
            if(processor._reg.b > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            
            /* test if zero */
            if((processor._reg.a - processor._reg.b)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0xB9
        CP_C: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.c & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.c > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.c)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0xBA
        CP_D: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.d & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.d > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.d)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0xBB
        CP_E: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.e & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.e > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.e)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0xBC
        CP_H: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.h & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.h > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0xBD
        CP_L: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.l & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.l > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.l)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       
        //0xBE
        CP_aHL: function(callback){
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (h & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(h > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0xBF
        CP_A: function(callback){
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (processor._reg.a & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.a > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - processor._reg.a)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },    








        //0xC6
        ADD_Ad8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            processor._reg.f = 0x00;
            /* test for half-carry */
            if((processor._reg.a&0xf + d&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            /* test for carry */
            if((processor._reg.a + d) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            /* test if zero */
            if((processor._reg.a + d)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += d;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },       

        //0xCE
        ADDC_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            var z = 0;
            if(processor._reg.f&0x10){z++}
            z+= d;
            if((processor._reg.a&0xf + z&0xf) & 0x10 == 0x10){
                processor._reg.f += (1<<5);
            }
            if((processor._reg.a + z) > 0x100 ){
                processor._reg.f += (1<<4);
            }            
            if((processor._reg.a + z)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a += z;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         }, 

        //0xD6
        SUB_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (d & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(h > processor._reg.a) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - h)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.a -= h;
            processor._reg.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         }, 

        //0xDE  
        SUBC_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            var t = 0;
            if(processor._reg.f & 0x10) { t++ }
            processor._reg.f = (1<<6);
            t += d
            if((processor._reg.a & 0xf) - (t & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            processor._reg.a -= t
            processor._reg.a < 0 ? processor._reg.f += (1<<4) : 0
            processor._reg.a &= 0xff,
            processor._reg.a == 0 ? flags+= (1<<7) : 0
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },   

        //0xE6
        AND_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            processor._reg.a &= d;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.f += (1<<5)
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xEE
        XOR_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            processor._reg.a ^= d;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
        },

        //0xF6
        OR_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            processor._reg.a |= d;
            processor._reg.a == 0 ? processor._reg.f = (1<<7) : processor._reg.f = 0;
            processor._reg.m = 2;
            processor._reg.t = 8;
            callback()
        },


        //0xFE
        CP_d8: function(callback){
            processor._reg.pc++;
            var d = MM.read(processor._reg.pc)
            processor._reg.f = (1<<6);
            if((processor._reg.a & 0xf) - (d & 0xf) > 0) {
                processor._reg.f += (1<<5);
            }
            if(processor._reg.a > d) {
                processor._reg.f += (1<<4);
            }
            if((processor._reg.a - d)&0xff == 0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 2;
            processor._reg.t = 8;
            callback()
         },    


   
        /*
            8-bit rotation/shift bit instructions
        */

        //0x17
        RLA: function(callback) { 
            /* 
                if 0001 0000 is set on a, set that to flags register, otherwise
                clear the flags register
            */
            processor._reg.a&0x10?processor._reg.f=0x10:processor._reg.f=0;
            /* Shift a register left 1 bit, add 1 if carry flag is set */
            if(processor._reg.f==0x10){
                processor._reg.a = (processor._reg.a<<1) + 1;
            } else {
                processor._reg.a = (processor._reg.a<<1);
            }
            processor._reg.a &= 255;
            processor._reg.m = 1;
            processor._reg.t = 4;

            callback()
         },
        //0x07
        RLCA: function(callback) { 
            /* 
                if a's highest bit is set, set flags to 0001 0000 AND shift left 
                1 bit adding 1, or clear it and shift left 1 bit
            */
            if(processor._reg.a&0x80){
                processor._reg.f = 0x10;
                processor._reg.a = processor._reg.a<<1 + 1                
            } else {
                processor._reg.f = 0;
                processor._reg.a = processor._reg.a<<1;
            }
            processor._reg.a &= 255;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x1F
        RRA: function(callback) { 
            /* 
                if lowest bit of a is set, set the carry flag
                shift a reg right 1 byte, add 0x80 if the carry flag is set
             */
            if(processor._reg.a&1){
                processor._reg.f = 0x10;
                processor._reg.a = processor._reg.a>>1 + 0x80;
            } else {
                processor._reg.f = 0;
                processor._reg.a = processor._reg.a>>1;
            }
            processor._reg.a &= 255;
            processor._reg.m = 1;
            processor._reg.t = 4;
            callback()
         },
        //0x0F
        RRCA: function(callback) { 
            if(processor._reg.a&1){
                processor._reg.a = processor._reg.a>>1+0x80;
                processor._reg.f = 0x10;
            } else {
                processor._reg.a = processor._reg.a>>1;
                processor._reg.f = 0;
            }

            processor._reg.a &= 255;
            processor._reg.m = 1;
            processor._reg.t = 4; 
            callback()
         },

        CBFILLER: function(callback){
            console.log('CB FILLER!')
            callback()
        },

        UNDOC: function(callback){
            console.log("Undocumented opcode!")
            callback()
        },
        

}

cbInstr = {

    NOP: function(callback) {
        console.log("CB NOP CALLED!")
        processor._reg.m=1;
        processor._reg.t=4;
        callback()
    },
    
    //0x11
    RL_C: function(callback) { 
        /* see if carry flag is set */
        var cf = processor._reg.f & (1<<4) ? 1 : 0;
        /* see if highest bit is 1, so we can set carry flag */
        var c = processor._reg.c & (1<<7) ? (1<<4) : 0
        processor._reg.c<<1 + cf;
        processor._reg.f = 0;
        processor._reg.c &= 0xff;
        /* set flags */
        if(processor._reg.c==0){
            processor._reg.f += (1<<7)
        }
        processor._reg.f += c
        processor._reg.m=2; 
        processor._reg.t=8; 
        callback()
    },

    BIT_1A: function(callback){
        var t = processor._reg.a & 1 ? 0 : 0x80;
        processor._reg.f &= 0x10;
        processor._reg.f += t;
        processor._reg.f += (1<<5);
        processor._reg.f &= 0xBF;
    },

    //0x7C
    BIT_7H: function(callback){
        /*
            TEST IF BIT 7 IS SET (7 6 5 4 3 2 1 0) 
            FLAGS SET:
                ZERO (1 IF HIGHEST BIT NOT SET) (Z 0x80)
                SUBTRACTION 0 (0x40)
                HALF-CARRY 1 (0x20)
            FLAGS PRESERVED: 
                CARRY (C 0x10)
        */
        var t = processor._reg.h & 0x80;
        processor._reg.f &= 0x10;
        if(t!=0x80){
            processor._reg.f += 0x80;
        }
        processor._reg.f += (1<<5);
        callback()
    },

}

CBFnMap = [
    //0x00
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x10
    cbInstr.NOP,
    cbInstr.RL_C,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x20
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x30
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x40
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.BIT_1A,

    //0x50
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x60
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x70
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.BIT_7H,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x80
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0x90
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0xA0
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0xB0
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0xC0
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0xD0
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0xE0
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

    //0xF0
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,
    cbInstr.NOP,

]

RegFnMap = [
    // 0x00
    instr.NOP,
    instr.LD_BCnn,
    instr.LD_aBC_A,
    instr.INC_BC,
    instr.INC_B,
    instr.DEC_B,
    instr.LD_Bd8,
    instr.RLCA,
    instr.LD_nnSP,
    instr.ADD_HLBC, 
    instr.LD_AaBC,
    instr.DEC_BC,
    instr.INC_C,
    instr.DEC_C,
    instr.LD_Cd8,
    instr.RRCA,

    //0x10
    instr.STOP,
    instr.LD_DEnn,
    instr.LD_aDE_A,
    instr.INC_DE,
    instr.INC_D,
    instr.DEC_D,
    instr.LD_Dd8,
    instr.RLA,
    instr.JRn,
    instr.ADD_HLDE, 
    instr.LD_AaDE,
    instr.DEC_DE,
    instr.INC_E,
    instr.DEC_E,
    instr.LD_Ed8,
    instr.RRA,

    //0x20
    instr.JRNZn,
    instr.LD_HLnn,
    instr.LD_aHLi_A,
    instr.INC_HL,
    instr.INC_H,
    instr.DEC_H,
    instr.LD_Hd8,
    instr.DAA,
    instr.JRZn,
    instr.ADD_HLHL, 
    instr.LD_AaHLi,
    instr.DEC_HL,
    instr.INC_L,
    instr.DEC_L,
    instr.LD_Ld8,
    instr.CPL,

    //0x30
    instr.JRNCn,
    instr.LD_SPnn,
    instr.LD_aHLd_A,
    instr.INC_SP,
    instr.INC_aHL,
    instr.DEC_aHL,
    instr.LD_aHLd8,
    instr.SCF,
    instr.JRCn,
    instr.ADD_HLSP, 
    instr.LD_AaHLd,
    instr.DEC_SP,
    instr.INC_A,
    instr.DEC_A,
    instr.LD_Ad8,
    instr.CCF,

    //0x40
    instr.LD_bb,
    instr.LD_bc,
    instr.LD_bd,
    instr.LD_be,
    instr.LD_bh,
    instr.LD_bl,
    instr.LD_BaHL,
    instr.LD_ba,
    instr.LD_cb,
    instr.LD_cc,
    instr.LD_cd,
    instr.LD_ce,
    instr.LD_ch,
    instr.LD_cl,
    instr.LD_CaHL,
    instr.LD_ca,

    //0x50
    instr.LD_db,
    instr.LD_dc,
    instr.LD_dd,
    instr.LD_de,
    instr.LD_dh,
    instr.LD_dl,
    instr.LD_DaHL,
    instr.LD_da,
    instr.LD_eb,
    instr.LD_ec,
    instr.LD_ed,
    instr.LD_ee,
    instr.LD_eh,
    instr.LD_el,
    instr.LD_EaHL,
    instr.LD_ea,

    //0x60
    instr.LD_hb,
    instr.LD_hc,
    instr.LD_hd,
    instr.LD_he,
    instr.LD_hh,
    instr.LD_hl,
    instr.LD_HaHL,
    instr.LD_ha,
    instr.LD_lb,
    instr.LD_lc,
    instr.LD_ld,
    instr.LD_le,
    instr.LD_lh,
    instr.LD_ll,
    instr.LD_LaHL,
    instr.LD_la,

    //0x70
    instr.LD_aHLB,
    instr.LD_aHLC,
    instr.LD_aHLD,
    instr.LD_aHLE,
    instr.LD_aHLH,
    instr.LD_aHLL,
    instr.HALT,
    instr.LD_aHLA,
    instr.LD_ab,
    instr.LD_ac,
    instr.LD_ad,
    instr.LD_ae,
    instr.LD_ah,
    instr.LD_al,
    instr.LD_AaHL,
    instr.LD_aa,
        
    //0x80
    instr.ADD_ab,
    instr.ADD_ac,
    instr.ADD_ad,
    instr.ADD_ae,
    instr.ADD_ah,
    instr.ADD_al,
    instr.ADD_aaHL,
    instr.ADD_aa,
    instr.ADDC_ab,
    instr.ADDC_ac,
    instr.ADDC_ad,
    instr.ADDC_ae,
    instr.ADDC_ah,
    instr.ADDC_al,
    instr.ADDC_aaHL,
    instr.ADDC_aa,

    //0x90
    instr.SUB_B,
    instr.SUB_C,
    instr.SUB_D,
    instr.SUB_E,
    instr.SUB_H,
    instr.SUB_L,
    instr.SUB_aHL,
    instr.SUB_A,
    instr.SUBC_B,
    instr.SUBC_C,
    instr.SUBC_D,
    instr.SUBC_E,
    instr.SUBC_H,
    instr.SUBC_L,
    instr.SUBC_aHL,
    instr.SUBC_A,

    //0xA0
    instr.AND_B,
    instr.AND_C,
    instr.AND_D,
    instr.AND_E,
    instr.AND_H,
    instr.AND_L,
    instr.AND_aHL,
    instr.AND_A,
    instr.XOR_B,
    instr.XOR_C,
    instr.XOR_D,
    instr.XOR_E,
    instr.XOR_H,
    instr.XOR_L,
    instr.XOR_aHL,
    instr.XOR_A,
    
    //0xB0
    instr.OR_B,
    instr.OR_C,
    instr.OR_D,
    instr.OR_E,
    instr.OR_H,
    instr.OR_L,
    instr.OR_aHL,
    instr.OR_A,
    instr.CP_B,
    instr.CP_C,
    instr.CP_D,
    instr.CP_E,
    instr.CP_H,
    instr.CP_L,
    instr.CP_aHL,
    instr.CP_A,

    //0xC0
    instr.RETNZ,
    instr.POP_BC,
    instr.JPNZa16,
    instr.JPa16,
    instr.CALLNZa16,
    instr.PUSH_BC,
    instr.ADD_Ad8,
    instr.R_0,
    instr.RETZ,
    instr.RET,
    instr.JPZa16,
    instr.CB,
    instr.CALLZa16,
    instr.CALLa16,
    instr.ADDC_Ad8,
    instr.R_8,

    //0xD0
    instr.RETNC,
    instr.POP_DE,
    instr.JPNCa16,
    instr.UNDOC,
    instr.CALLNCa16,
    instr.PUSH_DE,
    instr.SUB_d8,
    instr.R_10,
    instr.RETC,
    instr.RETI,
    instr.JPCa16,
    instr.UNDOC,
    instr.CALLCa16,
    instr.UNDOC,
    instr.SUBC_Ad8,
    instr.R_18,

    //0xE0
    instr.LD_ff00nA,
    instr.POP_HL,
    instr.LD_ff00cA,
    instr.UNDOC,
    instr.UNDOC,
    instr.PUSH_HL,
    instr.AND_d8,
    instr.R_20,
    instr.ADD_SPn,
    instr.JP_aHL,
    instr.LD_nnA,  
    instr.UNDOC,
    instr.UNDOC,
    instr.UNDOC,
    instr.XOR_d8,
    instr.R_28,
    
    //0xF0
    instr.LD_Aff00n,
    instr.POP_AF,
    instr.LD_Aff00c,
    instr.DI,
    instr.UNDOC,
    instr.PUSH_AF,
    instr.OR_d8,
    instr.R_30,
    instr.LDHL_SPd8,
    instr.LD_SPHL,
    instr.Ann,
    instr.EI,
    instr.UNDOC,
    instr.UNDOC,
    instr.CP_d8,
    instr.R_38,
]

processor = {

    //  Single byte registers are a, b, c, d, e, h, l    
    //  Registers may also be used as 16-bit registers:
    //  AF, BC, DE, HL
    //  sp: stack pointer, pc: program counter
    //  t: time, m: machine time, f: flags
    //  i: interrupts flag, ime: interrupt master enable
    //  Flags:   Zero (Z), Subtract (N), Half-Carry(H),
    //           Carry (C)
    //           7 6 5 4 3 2 1 0
    //           Z N H C 0 0 0 0

    _reg: { a:0, f:0, b:0, c:0, d:0, e:0, h:0, l:0,
        sp:0, pc:0, t:0, m:0, f:0, i:0, ime:0},
    _halt: 0,
    _stop: 0,
    _clock: {m:0, t:0},

    ohShit: 0,
    _debugTrace: [],

    /* Implement timing check here to see if GPU interrupt? */
    check: function(){
        processor._reg.pc++;
        if(processor.ohShit==1){
            console.log("Ohshit button activated! ABORTING!")
            console.log((processor._debugTrace).join("\n"))
            return 1;
        } else {
            return 0;
        }
    },

    exec: function(){
        //read the instruction in program counter

        var ins = MM.read(processor._reg.pc);
        if(ins==undefined){ 
            processor.ohShit = 1; 
            processor._debugTrace.push("NO INSTRUCTION! DUMPING:\n"); 
            processor._debugTrace.push(JSON.stringify(processor._reg));
            processor._debugTrace.push(JSON.stringify(processor._clock));
            var c = processor.check(); 
            return c;
         }
        var str = "Exec called! Opcode: 0x" + ins.toString(16)
        processor._debugTrace.push(str)
        processor._debugTrace.push(JSON.stringify(processor._clock))
        processor._debugTrace.push(JSON.stringify(processor._reg))
        if(processor._reg.pc>13)console.log("Read instruction: 0x"+ ins.toString(16) +" (booting:"+ MM._booting +")")
        if(!RegFnMap[ins]){
            console.log("FATAL! MISSING INSTRUCTION: 0x" + (MM.read(processor._reg.pc)).toString(16))
            processor.ohShit = 1;
            var c = processor.check(); 
            return c;
        } else if (ins==0xCB) {
            /* CB OPCODE PREFIX*/
            processor._reg.pc++;
            ins = MM.read(processor._reg.pc);
            CBFnMap[ins](function(){
                processor._clock.m+=processor._reg.m;
                processor._clock.t+=processor._reg.t;
                var c = processor.check(); 
                return c;
            });

        } else {
            RegFnMap[ins](function(){
                processor._clock.m+=processor._reg.m;
                processor._clock.t+=processor._reg.t;
                var c = processor.check(); 
                return c;
            });
        }

    },


    init: function(){
        console.log("Initializing CPU...")
        processor._reg = { a:0, f:0, b:0, c:0, d:0, e:0, h:0,l:0, sp:0, pc:0, t:0, m:0, f:0, i:0, ime:0},
        processor._halt = 0;
        processor._stop = 0;
        processor._clock = {m:0, t:0};
    },        
}

