
# String Smash

What it does: Compresses a string so that it can be embedded as a variable in JavaScript.

Sometimes you need to embed really long strings in JavaScript. Ok, rarely. But say
you embed some css in JavaScript and the strings repeat a lot. What if you could
use JavaScript variables to reduce the repitition? You could save KB in downloads.
This is a quick proof of concept.

## Before:

    var css = 'superlongword superlongword superlongword superlongword superlongword superlongword superlongword';


## End Result:

    var css = (function(){var a='superlongword';return [a,' ',a,' ',a,' ',a,' ',a,' ',a,' ',a].join('');})();

Whoo hoo! We saved 5 characters! OK not much compression, but longer strings yield better results.

## Usage:

    var css = 'superlongword superlongword superlongword superlongword superlongword superlongword superlongword';
    var result = smashjs(css);

    console.log(result);       // logs: (function(){var a='superlongword...
    console.log(eval(result)); // logs: superlongword superlongword supe...
