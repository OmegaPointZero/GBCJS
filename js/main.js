$('document').ready(function(){

   const take_byte = (function(byte){
        b = ("0" + byte.toString(16))
        return b.slice(-2)
    })

    const exLoop = function(){
        for(i=1;i>0;i++){
            /* 
                Exec calls check(). Check will check timing and interrupt flags. 
                IF an interrupt is to occur, do that, other wise call exec().
            */
            if(processor.ohShit!=1){
                processor.exec()
            } else {
                break;
            }
        }
    }


    const readFile = (function(file){
        var myFiles = $('#ROMUpload').prop('files');
        var myFile = myFiles[0]
        console.log(myFile)
        const fr = new FileReader();
        fr.onload = function(){
            var game = new Uint8Array(fr.result)
            MM.load(game);
            processor.init();
            exLoop()
        }

        fr.readAsArrayBuffer(myFile)
        var infoStr = "<p>"
        infoStr += "Game Loaded: " + myFile.name
        infoStr += "</p><p>File Size: " + myFile.size +" bytes</p>"
        $('.debuggingInfo').html(infoStr)
        
    })  

    document.getElementById('ROMUpload').addEventListener('change', readFile, false);

});
