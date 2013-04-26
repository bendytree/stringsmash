
(function(module, module_key){
    
    var indexToVariableName = function(a){
        var alpha = 'abcdefghijklmnopqrstuvwxyz';
        a += 1;
        var c = 0;
        var x = 1;      
        while (a >= x) {
            c++;
            a -= x;
            x *= 26;
        }
        var s = "";
        for (var i = 0; i < c; i++) {
            s = alpha.charAt(a % 26) + s;
            a = Math.floor(a/26);
        }

        return s;
    };

    var variableNameIndex = -1;
    var getNextVariableName = function(){
        variableNameIndex += 1;
        return indexToVariableName(variableNameIndex);
    };

    module[module_key] = function(txt){
        //get our guesses (at least 6 chars)
        var matches = txt.match(/[-a-z0-9]{6,}/ig);
    
        //which blocks are worth replacing?
        var blocks = [];
        for(var i=0; i<matches.length; i++){
            var match = matches[i];
            if (blocks.indexOf(match) != -1) continue;
            var matchCount = txt.split(match).length-1;
            if (matchCount > 3)
                blocks.push(match);
        }
    
        //sort, longest first
        blocks.sort(function(a, b){ 
            return b.length - a.length;
        });
    
        //name each block
        var result = txt.replace(/'/g,'\\\'');
        var vars = [];
        for(var i=0; i<blocks.length; i++){
            var block = blocks[i];
            var variableName = getNextVariableName();
            result = result.split(block).join("',"+variableName+",'");
            vars.push(variableName+"='"+block.replace(/'/g,'\\\'')+"'");
        }
    
        return "(function(){ var "+vars.join(',')+"; return ['"+result+"'].join(''); })()";
    }
    
})(module ? module : window, module ? 'exports' : 'stringsmash');